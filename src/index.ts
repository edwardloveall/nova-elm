import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { constVoid, pipe } from "fp-ts/function";
import { match } from "ts-pattern";
import * as D from "io-ts/Decoder";

import { isFalse } from "./typeGuards";

/*
 * Types
 */

interface StartError {
  readonly _tag: "startError";
  readonly reason: string;
}

interface ConfigureError {
  readonly _tag: "configureError";
  readonly reason: string;
}

interface InstallDepsError {
  readonly _tag: "installDepsError";
  readonly reason: string;
}

interface ShutdownError {
  readonly _tag: "shutdownError";
  readonly reason: string;
}

enum ExtensionConfigKeys {
  ElmPath = "hansjhoffman.elm.config.elmPath",
  ElmFormatPath = "hansjhoffman.elm.config.elmFormatPath",
  ElmReviewPath = "hansjhoffman.elm.config.elmReviewPath",
  ElmTestPath = "hansjhoffman.elm.config.elmTestPath",
  LSDisableDiagnostics = "hansjhoffman.elm.config.disableDiagnostics",
  LSReviewDiagnostics = "hansjhoffman.elm.config.elmReviewDiagnostics",
  LSTrace = "hansjhoffman.elm.config.elmTrace",
}

type Behavior = "error" | "off" | "warning";

interface ClientSettings {
  readonly elmLS: {
    // The path to your `elm` binary.
    readonly elmPath: string;
    // The path to your `elm-format` binary.
    readonly elmFormatPath: string;
    // The path to your `elm-review` binary.
    readonly elmReviewPath: string;
    // Set severity or disable linting diagnostics for `elm-review`.
    readonly elmReviewDiagnostics: Behavior;
    // The path to your `elm-test` binary.
    readonly elmTestPath: string;
    // Disable linting diagnostics from the language server.
    readonly disableElmLSDiagnostics: boolean;
    // Traces the communication between Nova and the language server.
    readonly trace: {
      readonly server: Behavior;
    };
    // Skip confirmation for the Install Package code action.
    readonly skipInstallPackageConfirmation: boolean;
    // Only update compiler diagnostics on save, not on document change.
    readonly onlyUpdateDiagnosticsOnSave: boolean;
  };
}

/*
 * Helpers
 */

const showNotification = (body: string): void => {
  if (nova.inDevMode()) {
    const notification = new NotificationRequest("elm-nova-notification");
    notification.title = nova.localize(nova.extension.name);
    notification.body = nova.localize(body);
    nova.notifications.add(notification);
  }
};

const mkExtensionDepsPath = (binary: string): string => {
  return nova.path.join(nova.extension.globalStoragePath, "node_modules", ".bin", binary);
};

const getClientSettings = (): ClientSettings => ({
  elmLS: {
    elmPath: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmPath)),
      O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.ElmPath))),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.getOrElse(() => mkExtensionDepsPath("elm")),
    ),
    elmFormatPath: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmFormatPath)),
      O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.ElmFormatPath))),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.getOrElse(() => mkExtensionDepsPath("elm-format")),
    ),
    elmReviewPath: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmReviewPath)),
      O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.ElmReviewPath))),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.getOrElse(() => mkExtensionDepsPath("elm-review")),
    ),
    elmReviewDiagnostics: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.LSReviewDiagnostics)),
      O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.LSReviewDiagnostics))),
      O.chain((value) =>
        O.fromEither(
          D.union(D.literal("error"), D.literal("off"), D.literal("warning")).decode(value),
        ),
      ),
      O.getOrElseW(() => "off"),
    ) as Behavior,
    elmTestPath: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmTestPath)),
      O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.ElmTestPath))),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.getOrElse(() => mkExtensionDepsPath("elm-test")),
    ),
    disableElmLSDiagnostics: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.LSDisableDiagnostics)),
      O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.LSDisableDiagnostics))),
      O.chain((value) => O.fromEither(D.boolean.decode(value))),
      O.getOrElseW(() => false),
    ),
    trace: {
      server: pipe(
        O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.LSTrace)),
        O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.LSTrace))),
        O.chain((value) =>
          O.fromEither(
            D.union(D.literal("error"), D.literal("off"), D.literal("warning")).decode(value),
          ),
        ),
        O.getOrElseW(() => "off"),
      ) as Behavior,
    },
    skipInstallPackageConfirmation: false,
    onlyUpdateDiagnosticsOnSave: false,
  },
});

/*
 * Main
 */

let elmExtension: O.Option<ElmExtension> = O.none;
const compositeDisposable: CompositeDisposable = new CompositeDisposable();

export class ElmExtension {
  private languageClient: O.Option<LanguageClient>;

  constructor() {
    this.languageClient = O.none;

    this.start();
  }

  start(): void {
    showNotification("Starting extension...");

    const safeStart = pipe(
      TE.sequenceSeqArray<void, InstallDepsError | ConfigureError | StartError>([
        TE.tryCatch<InstallDepsError, void>(
          () => {
            return new Promise<void>((resolve, reject) => {
              const process = new Process("/usr/bin/env", {
                args: ["npm", "install", "--only=prod", "--no-audit"],
                cwd: nova.extension.globalStoragePath,
              });

              process.onDidExit((status) => (status === 0 ? resolve() : reject()));

              process.start();
            });
          },
          () => ({ _tag: "installDepsError", reason: "Failed to install extension deps." }),
        ),
        TE.tryCatch<ConfigureError, void>(
          () => {
            return new Promise<void>((resolve, reject) => {
              const elmJSON = nova.path.join(nova.workspace.path || "", "elm.json");

              if (isFalse(nova.workspace.contains(elmJSON))) {
                reject();
              }

              pipe(
                this.languageClient,
                O.map((oldClient) => {
                  oldClient.stop();
                  nova.subscriptions.remove(compositeDisposable);
                  this.languageClient = O.none;
                }),
              );

              const newClient = new LanguageClient(
                "elmLS",
                nova.extension.name,
                {
                  path: mkExtensionDepsPath("elm-language-server"),
                  type: "stdio",
                },
                {
                  initializationOptions: getClientSettings(),
                  syntaxes: ["elm"],
                },
              );

              compositeDisposable.add(
                newClient.onDidStop((err) => {
                  let message = nova.localize("Elm Language Server stopped unexpectedly");
                  if (err) {
                    message += `:\n\n${err.toString()}`;
                  } else {
                    message += ".";
                  }
                  message += `\n\n${nova.localize(
                    "Please report this, along with any output in the Extension Console.",
                  )}`;

                  nova.workspace.showActionPanel(
                    message,
                    { buttons: [nova.localize("Restart"), nova.localize("Ignore")] },
                    (idx) => {
                      if (idx == 0) {
                        // nova.commands.invoke("x.x.reload");
                      }
                    },
                  );
                }),
              );

              nova.subscriptions.add(compositeDisposable);

              this.languageClient = O.some(newClient);

              resolve();
            });
          },
          () => ({ _tag: "configureError", reason: "Failed to configure language server." }),
        ),
        TE.tryCatch<StartError, void>(
          () => {
            return new Promise<void>((resolve, _reject) => {
              pipe(
                this.languageClient,
                O.map((client) => {
                  // client.start();
                }),
              );

              resolve();
            });
          },
          () => ({ _tag: "startError", reason: "Failed to start language server." }),
        ),
      ]),
    );

    safeStart().then(
      E.fold(
        (err) => {
          match(err)
            .with({ _tag: "installDepsError" }, ({ reason }) => console.error(reason))
            .with({ _tag: "configureError" }, ({ reason }) => console.error(reason))
            .with({ _tag: "startError" }, ({ reason }) => console.error(reason))
            .exhaustive();
        },
        () => console.log("Activated 🎉. Happy Elm-ing :)"),
      ),
    );
  }

  stop(): void {
    const safeShutdown = pipe(
      TE.tryCatch<ShutdownError, void>(
        () => {
          return new Promise<void>((resolve, _reject) => {
            pipe(
              this.languageClient,
              O.map((client) => {
                client.stop();
                nova.subscriptions.remove(compositeDisposable);
                this.languageClient = O.none;
              }),
            );

            resolve();
          });
        },
        () => ({ _tag: "shutdownError", reason: "Uh oh... Failed to deactivate plugin." }),
      ),
    );

    safeShutdown().then(
      E.fold(
        (err) => {
          match(err)
            .with({ _tag: "shutdownError" }, ({ reason }) => console.error(reason))
            .exhaustive();
        },
        () => console.log("Deactivated. Come back soon :)"),
      ),
    );
  }
}

export const activate = (): void => {
  console.log("Activating...");
  showNotification("Starting extension...");

  const extension = new ElmExtension();
  extension.start();

  elmExtension = O.some(extension);
};

export const deactivate = (): void => {
  console.log("Deactivating...");

  pipe(
    elmExtension,
    O.fold(constVoid, (extension) => {
      extension.stop();
      elmExtension = O.none;
    }),
  );
};
