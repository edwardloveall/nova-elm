'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
var constUndefined = 
/*#__PURE__*/
constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
var constVoid = constUndefined;
function pipe$1(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
            return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
        case 11:
            return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
        case 12:
            return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
        case 13:
            return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
        case 14:
            return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));
        case 15:
            return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));
        case 16:
            return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));
        case 17:
            return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));
        case 18:
            return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));
        case 19:
            return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));
        case 20:
            return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
    }
    return;
}

(undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft$1 = function (ma) { return ma._tag === 'Left'; };

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
var isLeft = isLeft$1;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
var isRight = function (ma) { return ma._tag === 'Right'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var left = function (e) { return ({ _tag: 'Left', left: e }); };
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var right = function (a) { return ({ _tag: 'Right', right: a }); };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
var matchW$1 = function (onLeft, onRight) { return function (ma) {
    return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
}; };
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { match, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     match(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     match(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
var match$1 = matchW$1;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
var fold$1 = match$1;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map$1 = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right(f(fa.right));
}; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) { return (isLeft(fa) ? left(f(fa.left)) : right(g(fa.right))); }; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : fa;
}; };
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) {
    return isLeft(ma) ? ma : f(ma.right);
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain$1 = chainW;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI$1 = 'Either';

/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 2.0.0
 */
var isNone = function (fa) { return fa._tag === 'None'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
var none = { _tag: 'None' };
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
var some = function (a) { return ({ _tag: 'Some', value: a }); };
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
function getRight(ma) {
    return ma._tag === 'Left' ? none : some(ma.right);
}
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getright)
 *
 * @category constructors
 * @since 2.0.0
 */
var fromEither = getRight;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
var matchW = function (onNone, onSome) { return function (ma) {
    return isNone(ma) ? onNone() : onSome(ma.value);
}; };
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
var match = matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
var fold = match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onNone) { return function (ma) { return (isNone(ma) ? onNone() : ma.value); }; };
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
var fromNullable = function (a) { return (a == null ? none : some(a)); };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isNone(fa) ? none : some(f(fa.value));
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) {
    return isNone(ma) ? none : f(ma.value);
}; };
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return isNone(fa) ? that() : fa;
}; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category Alt
 * @since 2.0.0
 */
var alt$1 = altW;

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { left, right } from 'fp-ts/Either'
 * import { tryCatch } from 'fp-ts/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @category interop
 * @since 2.0.0
 */
var tryCatch = function (f, onRejected) { return function () {
    return f().then(right, function (reason) { return left(onRejected(reason)); });
}; };
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 2.9.0
 */
var traverseSeqArrayWithIndex = function (f) { return function (as) { return function () {
    return as.reduce(function (acc, a, i) {
        return acc.then(function (ebs) {
            return isLeft(ebs)
                ? acc
                : f(i, a)().then(function (eb) {
                    if (isLeft(eb)) {
                        return eb;
                    }
                    ebs.right.push(eb.right);
                    return ebs;
                });
        });
    }, Promise.resolve(right([])));
}; }; };
/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 2.9.0
 */
var traverseSeqArray = function (f) { return traverseSeqArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 2.9.0
 */
var sequenceSeqArray = 
/*#__PURE__*/
traverseSeqArray(identity);

var lib = {};

var symbols = {};

/**
 * Symbols used internally within ts-pattern to construct and discriminate
 * Guard, Not, and Select, and AnonymousSelect patterns
 *
 * Symbols have the advantage of not appearing in auto-complete suggestions in
 * user defined patterns, and eliminate the admittedly unlikely risk of property
 * overlap between ts-pattern internals and user defined patterns.
 *
 * These symbols have to be visible to tsc for type inference to work, but
 * users should not import them
 * @module
 * @private
 * @internal
 */
Object.defineProperty(symbols, "__esModule", { value: true });
symbols.AnonymousSelect = symbols.NamedSelect = symbols.Not = symbols.Guard = symbols.PatternKind = void 0;
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.PatternKind = Symbol('@ts-pattern/pattern-kind');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.Guard = Symbol('@ts-pattern/guard');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.Not = Symbol('@ts-pattern/not');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.NamedSelect = Symbol('@ts-pattern/named-select');
/** @internal This symbol should only be used by ts-pattern's internals. */
symbols.AnonymousSelect = Symbol('@ts-pattern/anonymous-select');

var guards = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOf = exports.select = exports.ANONYMOUS_SELECT_KEY = exports.not = exports.when = void 0;
const symbols$1 = symbols;
const when = (predicate) => ({
    [symbols$1.PatternKind]: symbols$1.Guard,
    [symbols$1.Guard]: predicate,
});
exports.when = when;
const not = (pattern) => ({
    [symbols$1.PatternKind]: symbols$1.Not,
    [symbols$1.Not]: pattern,
});
exports.not = not;
exports.ANONYMOUS_SELECT_KEY = '@ts-pattern/__anonymous-select-key';
function select(key) {
    return key === undefined
        ? {
            [symbols$1.PatternKind]: symbols$1.AnonymousSelect,
        }
        : {
            [symbols$1.PatternKind]: symbols$1.NamedSelect,
            [symbols$1.NamedSelect]: key,
        };
}
exports.select = select;
function isInstanceOf(classConstructor) {
    return (val) => val instanceof classConstructor;
}
const instanceOf = (classConstructor) => exports.when(isInstanceOf(classConstructor));
exports.instanceOf = instanceOf;
}(guards));

var wildcards = {};

Object.defineProperty(wildcards, "__esModule", { value: true });
wildcards.__ = void 0;
const guards_1 = guards;
function isUnknown(x) {
    return true;
}
function isNumber(x) {
    return typeof x === 'number' && !Number.isNaN(x);
}
function isString(x) {
    return typeof x === 'string';
}
function isBoolean(x) {
    return typeof x === 'boolean';
}
function isNullish(x) {
    return x === null || x === undefined;
}
const unknownGuard = guards_1.when(isUnknown);
const stringGuard = guards_1.when(isString);
const numberGuard = guards_1.when(isNumber);
const booleanGuard = guards_1.when(isBoolean);
const nullishGuard = guards_1.when(isNullish);
/**
 * ### Catch All wildcard
 * `__` is wildcard pattern, matching **any value**.
 *
 * `__.string` is wildcard pattern matching any **string**.
 *
 * `__.number` is wildcard pattern matching any **number**.
 *
 * `__.boolean` is wildcard pattern matching any **boolean**.
 *
 * `__.nullish` is wildcard pattern matching **null** or **undefined**.
 * @example
 *  match(value)
 *   .with(__, () => 'will always match')
 *   .with(__.string, () => 'will match on strings only')
 *   .with(__.number, () => 'will match on numbers only')
 *   .with(__.boolean, () => 'will match on booleans only')
 *   .with(__.nullish, () => 'will match on null or undefined only')
 */
wildcards.__ = Object.assign(unknownGuard, {
    string: stringGuard,
    number: numberGuard,
    boolean: booleanGuard,
    nullish: nullishGuard,
});

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatching = exports.match = exports.instanceOf = exports.select = exports.not = exports.when = exports.__ = void 0;
const symbols$1 = symbols;
const guards_1 = guards;
Object.defineProperty(exports, "when", { enumerable: true, get: function () { return guards_1.when; } });
Object.defineProperty(exports, "not", { enumerable: true, get: function () { return guards_1.not; } });
Object.defineProperty(exports, "select", { enumerable: true, get: function () { return guards_1.select; } });
Object.defineProperty(exports, "instanceOf", { enumerable: true, get: function () { return guards_1.instanceOf; } });
const wildcards_1 = wildcards;
Object.defineProperty(exports, "__", { enumerable: true, get: function () { return wildcards_1.__; } });
/**
 * #### match
 *
 * Entry point to create a pattern matching expression.
 *
 * It returns a `Match` builder, on which you can chain
 * several `.with(pattern, handler)` clauses.
 */
const match = (value) => builder(value, []);
exports.match = match;
/**
 * ### builder
 * This is the implementation of our pattern matching, using the
 * builder pattern.
 */
const builder = (value, cases) => {
    const run = () => {
        const entry = cases.find(({ test }) => test(value));
        if (!entry) {
            let displayedValue;
            try {
                displayedValue = JSON.stringify(value);
            }
            catch (e) {
                displayedValue = value;
            }
            throw new Error(`Pattern matching error: no pattern matches value ${displayedValue}`);
        }
        return entry.handler(entry.select(value), value);
    };
    return {
        with(...args) {
            const handler = args[args.length - 1];
            const patterns = [];
            const predicates = [];
            for (let i = 0; i < args.length - 1; i++) {
                const arg = args[i];
                if (typeof arg === 'function') {
                    predicates.push(arg);
                }
                else {
                    patterns.push(arg);
                }
            }
            let selected = {};
            const doesMatch = (value) => Boolean(patterns.some((pattern) => matchPattern(pattern, value, (key, value) => {
                selected[key] = value;
            })) && predicates.every((predicate) => predicate(value)));
            return builder(value, cases.concat([
                {
                    test: doesMatch,
                    handler,
                    select: (value) => Object.keys(selected).length
                        ? selected[guards_1.ANONYMOUS_SELECT_KEY] !== undefined
                            ? selected[guards_1.ANONYMOUS_SELECT_KEY]
                            : selected
                        : value,
                },
            ]));
        },
        when: (predicate, handler) => builder(value, cases.concat([
            {
                test: predicate,
                handler,
                select: (value) => value,
            },
        ])),
        otherwise: (handler) => builder(value, cases.concat([
            {
                test: () => true,
                handler,
                select: (value) => value,
            },
        ])).run(),
        exhaustive: () => run(),
        run,
    };
};
const isObject = (value) => Boolean(value && typeof value === 'object');
const isGuardPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Guard;
};
const isNotPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.Not;
};
const isNamedSelectPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.NamedSelect;
};
const isAnonymousSelectPattern = (x) => {
    const pattern = x;
    return pattern && pattern[symbols$1.PatternKind] === symbols$1.AnonymousSelect;
};
// tells us if the value matches a given pattern.
const matchPattern = (pattern, value, select) => {
    if (isObject(pattern)) {
        if (isGuardPattern(pattern))
            return Boolean(pattern[symbols$1.Guard](value));
        if (isNamedSelectPattern(pattern)) {
            select(pattern[symbols$1.NamedSelect], value);
            return true;
        }
        if (isAnonymousSelectPattern(pattern)) {
            select(guards_1.ANONYMOUS_SELECT_KEY, value);
            return true;
        }
        if (isNotPattern(pattern))
            return !matchPattern(pattern[symbols$1.Not], value, select);
        if (!isObject(value))
            return false;
        if (Array.isArray(pattern)) {
            if (!Array.isArray(value))
                return false;
            // List pattern
            if (pattern.length === 1) {
                const selected = {};
                const listSelect = (key, value) => {
                    selected[key] = (selected[key] || []).concat([value]);
                };
                const doesMatch = value.every((v) => matchPattern(pattern[0], v, listSelect));
                if (doesMatch) {
                    Object.keys(selected).forEach((key) => select(key, selected[key]));
                }
                return doesMatch;
            }
            // Tuple pattern
            return pattern.length === value.length
                ? pattern.every((subPattern, i) => matchPattern(subPattern, value[i], select))
                : false;
        }
        if (pattern instanceof Map) {
            if (!(value instanceof Map))
                return false;
            return [...pattern.keys()].every((key) => matchPattern(pattern.get(key), value.get(key), select));
        }
        if (pattern instanceof Set) {
            if (!(value instanceof Set))
                return false;
            if (pattern.size === 0)
                return value.size === 0;
            if (pattern.size === 1) {
                const [subPattern] = [...pattern.values()];
                return Object.values(wildcards_1.__).includes(subPattern)
                    ? matchPattern([subPattern], [...value.values()], select)
                    : value.has(subPattern);
            }
            return [...pattern.values()].every((subPattern) => value.has(subPattern));
        }
        return Object.keys(pattern).every((k) => matchPattern(
        // @ts-ignore
        pattern[k], 
        // @ts-ignore
        value[k], select));
    }
    return value === pattern;
};
function isMatching(...args) {
    if (args.length === 1) {
        const [pattern] = args;
        return (value) => matchPattern(pattern, value, () => { });
    }
    if (args.length === 2) {
        const [pattern, value] = args;
        return matchPattern(pattern, value, () => { });
    }
    throw new Error(`isMatching wasn't given enough arguments: expected 1 or 2, receive ${args.length}.`);
}
exports.isMatching = isMatching;
}(lib));

/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#flow) from `function` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
var pipe = pipe$1;

/**
 * @category constructors
 * @since 2.2.7
 */
var of = function (a) { return ({ _tag: 'Of', value: a }); };
/**
 * @category constructors
 * @since 2.2.7
 */
var concat = function (left, right) { return ({
    _tag: 'Concat',
    left: left,
    right: right
}); };
/**
 * @category instances
 * @since 2.2.7
 */
function getSemigroup$1() {
    return { concat: concat };
}

/**
 * @category constructors
 * @since 2.2.7
 */
var leaf = function (actual, error) { return ({ _tag: 'Leaf', actual: actual, error: error }); };
/**
 * @category constructors
 * @since 2.2.7
 */
var member = function (index, errors) { return ({
    _tag: 'Member',
    index: index,
    errors: errors
}); };
/**
 * @category instances
 * @since 2.2.7
 */
function getSemigroup() {
    return getSemigroup$1();
}

/**
 * @since 2.2.0
 */
function memoize(f) {
    var cache = new Map();
    return function (a) {
        if (!cache.has(a)) {
            var b = f(a);
            cache.set(a, b);
            return b;
        }
        return cache.get(a);
    };
}

/**
 * **This module is experimental**
 *
 * Experimental features are published in order to get early feedback from the community, see these tracking
 * [issues](https://github.com/gcanti/io-ts/issues?q=label%3Av2.2+) for further discussions and enhancements.
 *
 * A feature tagged as _Experimental_ is in a high state of flux, you're at risk of it changing without notice.
 *
 * @since 2.2.0
 */
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.2.0
 */
var literal$2 = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return ({
        is: function (u) { return values.findIndex(function (a) { return a === u; }) !== -1; }
    });
};
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @category primitives
 * @since 2.2.0
 */
var string$1 = {
    is: function (u) { return typeof u === 'string'; }
};
/**
 * Note: `NaN` is excluded.
 *
 * @category primitives
 * @since 2.2.0
 */
var number = {
    is: function (u) { return typeof u === 'number' && !isNaN(u); }
};
/**
 * @category primitives
 * @since 2.2.0
 */
var boolean$1 = {
    is: function (u) { return typeof u === 'boolean'; }
};
/**
 * @category primitives
 * @since 2.2.0
 */
var UnknownArray = {
    is: Array.isArray
};
/**
 * @category primitives
 * @since 2.2.0
 */
var UnknownRecord = {
    is: function (u) { return u !== null && typeof u === 'object' && !Array.isArray(u); }
};
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.2.0
 */
var refine = function (refinement) { return function (from) { return ({
    is: function (i) { return from.is(i) && refinement(i); }
}); }; };
/**
 * @category combinators
 * @since 2.2.0
 */
var nullable = function (or) { return ({
    is: function (i) { return i === null || or.is(i); }
}); };
/**
 * @category combinators
 * @since 2.2.15
 */
var struct = function (properties) {
    return pipe(UnknownRecord, refine(function (r) {
        for (var k in properties) {
            if (!(k in r) || !properties[k].is(r[k])) {
                return false;
            }
        }
        return true;
    }));
};
/**
 * Use `struct` instead.
 *
 * @category combinators
 * @since 2.2.0
 * @deprecated
 */
var type = struct;
/**
 * @category combinators
 * @since 2.2.0
 */
var partial = function (properties) {
    return pipe(UnknownRecord, refine(function (r) {
        for (var k in properties) {
            var v = r[k];
            if (v !== undefined && !properties[k].is(v)) {
                return false;
            }
        }
        return true;
    }));
};
/**
 * @category combinators
 * @since 2.2.0
 */
var array = function (item) {
    return pipe(UnknownArray, refine(function (us) { return us.every(item.is); }));
};
/**
 * @category combinators
 * @since 2.2.0
 */
var record = function (codomain) {
    return pipe(UnknownRecord, refine(function (r) {
        for (var k in r) {
            if (!codomain.is(r[k])) {
                return false;
            }
        }
        return true;
    }));
};
/**
 * @category combinators
 * @since 2.2.0
 */
var tuple = function () {
    var components = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        components[_i] = arguments[_i];
    }
    return ({
        is: function (u) { return Array.isArray(u) && u.length === components.length && components.every(function (c, i) { return c.is(u[i]); }); }
    });
};
/**
 * @category combinators
 * @since 2.2.0
 */
var intersect = function (right) { return function (left) { return ({
    is: function (u) { return left.is(u) && right.is(u); }
}); }; };
/**
 * @category combinators
 * @since 2.2.0
 */
var union$2 = function () {
    var members = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        members[_i] = arguments[_i];
    }
    return ({
        is: function (u) { return members.some(function (m) { return m.is(u); }); }
    });
};
/**
 * @category combinators
 * @since 2.2.0
 */
var sum = function (tag) { return function (members) {
    return pipe(UnknownRecord, refine(function (r) {
        var v = r[tag];
        if (v in members) {
            return members[v].is(r);
        }
        return false;
    }));
}; };
/**
 * @category combinators
 * @since 2.2.0
 */
var lazy = function (f) {
    var get = memoize(f);
    return {
        is: function (u) { return get().is(u); }
    };
};
/**
 * @category combinators
 * @since 2.2.15
 */
var readonly = identity;
/**
 * @category combinators
 * @since 2.2.8
 */
var alt = function (that) { return function (me) { return ({
    is: function (i) { return me.is(i) || that().is(i); }
}); }; };
/**
 * @category combinators
 * @since 2.2.8
 */
var zero = function () { return ({
    is: function (_) { return false; }
}); };
/**
 * @category combinators
 * @since 2.2.8
 */
var compose = function (to) { return function (from) { return ({
    is: function (i) { return from.is(i) && to.is(i); }
}); }; };
/**
 * @category combinators
 * @since 2.2.8
 */
var id = function () { return ({
    is: function (_) { return true; }
}); };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.2.0
 */
var URI = 'io-ts/Guard';
/**
 * @category instances
 * @since 2.2.8
 */
var Schemable = {
    URI: URI,
    literal: literal$2,
    string: string$1,
    number: number,
    boolean: boolean$1,
    nullable: nullable,
    type: type,
    struct: struct,
    partial: partial,
    record: record,
    array: array,
    tuple: tuple,
    intersect: intersect,
    sum: sum,
    lazy: function (_, f) { return lazy(f); },
    readonly: readonly
};
/**
 * @category instances
 * @since 2.2.8
 */
var WithUnknownContainers = {
    UnknownArray: UnknownArray,
    UnknownRecord: UnknownRecord
};
/**
 * @category instances
 * @since 2.2.8
 */
var WithUnion = {
    union: union$2
};
/**
 * @category instances
 * @since 2.2.8
 */
var WithRefine = {
    refine: refine
};

var G = /*#__PURE__*/Object.freeze({
    __proto__: null,
    literal: literal$2,
    string: string$1,
    number: number,
    boolean: boolean$1,
    UnknownArray: UnknownArray,
    UnknownRecord: UnknownRecord,
    refine: refine,
    nullable: nullable,
    struct: struct,
    type: type,
    partial: partial,
    array: array,
    record: record,
    tuple: tuple,
    intersect: intersect,
    union: union$2,
    sum: sum,
    lazy: lazy,
    readonly: readonly,
    alt: alt,
    zero: zero,
    compose: compose,
    id: id,
    URI: URI,
    Schemable: Schemable,
    WithUnknownContainers: WithUnknownContainers,
    WithUnion: WithUnion,
    WithRefine: WithRefine
});

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.2.7
 */
function fromRefinement$1(M) {
    return function (refinement, onError) { return ({
        decode: function (i) { return (refinement(i) ? M.of(i) : M.throwError(onError(i))); }
    }); };
}
/**
 * @category constructors
 * @since 2.2.7
 */
function literal$1(M) {
    return function (onError) { return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return ({
            decode: function (i) { return (literal$2.apply(G, values).is(i) ? M.of(i) : M.throwError(onError(i, values))); }
        });
    }; };
}
/**
 * @category combinators
 * @since 2.2.7
 */
function union$1(M) {
    return function (onMemberError) { return function () {
        var members = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            members[_i] = arguments[_i];
        }
        return ({
            decode: function (i) {
                var out = M.mapLeft(members[0].decode(i), function (e) { return onMemberError(0, e); });
                var _loop_1 = function (index) {
                    out = M.alt(out, function () { return M.mapLeft(members[index].decode(i), function (e) { return onMemberError(index, e); }); });
                };
                for (var index = 1; index < members.length; index++) {
                    _loop_1(index);
                }
                return out;
            }
        });
    }; };
}

// -------------------------------------------------------------------------------------
// Kleisli config
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
var SE = 
/*#__PURE__*/
getSemigroup();
/**
 * @internal
 */
var ap = function (fab, fa) {
    return isLeft(fab)
        ? isLeft(fa)
            ? left(SE.concat(fab.left, fa.left))
            : fab
        : isLeft(fa)
            ? fa
            : right(fab.right(fa.right));
};
var M = {
    URI: URI$1,
    _E: undefined,
    map: function (fa, f) { return pipe(fa, map$1(f)); },
    ap: ap,
    of: right,
    chain: function (ma, f) { return pipe(ma, chain$1(f)); },
    throwError: left,
    bimap: function (fa, f, g) { return pipe(fa, bimap(f, g)); },
    mapLeft: function (fa, f) { return pipe(fa, mapLeft(f)); },
    alt: function (me, that) {
        if (isRight(me)) {
            return me;
        }
        var ea = that();
        return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea;
    }
};
/**
 * @category DecodeError
 * @since 2.2.7
 */
var error = function (actual, message) { return of(leaf(actual, message)); };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.2.8
 */
var fromRefinement = function (refinement, expected) {
    return fromRefinement$1(M)(refinement, function (u) { return error(u, expected); });
};
/**
 * @category constructors
 * @since 2.2.8
 */
var fromGuard = function (guard, expected) {
    return fromRefinement(guard.is, expected);
};
/**
 * @category constructors
 * @since 2.2.7
 */
var literal = 
/*#__PURE__*/
literal$1(M)(function (u, values) { return error(u, values.map(function (value) { return JSON.stringify(value); }).join(' | ')); });
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @category primitives
 * @since 2.2.7
 */
var string = 
/*#__PURE__*/
fromGuard(string$1, 'string');
/**
 * @category primitives
 * @since 2.2.7
 */
var boolean = 
/*#__PURE__*/
fromGuard(boolean$1, 'boolean');
/**
 * @category combinators
 * @since 2.2.7
 */
var union = 
/*#__PURE__*/
union$1(M)(function (i, e) { return of(member(i, e)); });

/*
 * Types
 */
var isFalse = function (x) { return typeof x === "boolean" && !x; };

var ExtensionConfigKeys;
(function (ExtensionConfigKeys) {
    ExtensionConfigKeys["ElmPath"] = "hansjhoffman.elm.config.elmPath";
    ExtensionConfigKeys["ElmFormatPath"] = "hansjhoffman.elm.config.elmFormatPath";
    ExtensionConfigKeys["ElmReviewPath"] = "hansjhoffman.elm.config.elmReviewPath";
    ExtensionConfigKeys["ElmTestPath"] = "hansjhoffman.elm.config.elmTestPath";
    ExtensionConfigKeys["LSDisableDiagnostics"] = "hansjhoffman.elm.config.disableDiagnostics";
    ExtensionConfigKeys["LSReviewDiagnostics"] = "hansjhoffman.elm.config.elmReviewDiagnostics";
    ExtensionConfigKeys["LSTrace"] = "hansjhoffman.elm.config.elmTrace";
})(ExtensionConfigKeys || (ExtensionConfigKeys = {}));
/*
 * Helpers
 */
var showNotification = function (body) {
    if (nova.inDevMode()) {
        var notification = new NotificationRequest("elm-nova-notification");
        notification.title = nova.localize(nova.extension.name);
        notification.body = nova.localize(body);
        nova.notifications.add(notification);
    }
};
var mkExtensionDepsPath = function (binary) {
    return nova.path.join(nova.extension.globalStoragePath, "node_modules", ".bin", binary);
};
var getClientSettings = function () { return ({
    elmLS: {
        elmPath: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmPath)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.ElmPath)); }), chain(function (path) { return fromEither(string.decode(path)); }), getOrElse(function () { return mkExtensionDepsPath("elm"); })),
        elmFormatPath: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmFormatPath)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.ElmFormatPath)); }), chain(function (path) { return fromEither(string.decode(path)); }), getOrElse(function () { return mkExtensionDepsPath("elm-format"); })),
        elmReviewPath: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmReviewPath)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.ElmReviewPath)); }), chain(function (path) { return fromEither(string.decode(path)); }), getOrElse(function () { return mkExtensionDepsPath("elm-review"); })),
        elmReviewDiagnostics: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.LSReviewDiagnostics)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.LSReviewDiagnostics)); }), chain(function (value) {
            return fromEither(union(literal("error"), literal("off"), literal("warning")).decode(value));
        }), getOrElseW(function () { return "off"; })),
        elmTestPath: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.ElmTestPath)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.ElmTestPath)); }), chain(function (path) { return fromEither(string.decode(path)); }), getOrElse(function () { return mkExtensionDepsPath("elm-test"); })),
        disableElmLSDiagnostics: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.LSDisableDiagnostics)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.LSDisableDiagnostics)); }), chain(function (value) { return fromEither(boolean.decode(value)); }), getOrElseW(function () { return false; })),
        trace: {
            server: pipe$1(fromNullable(nova.workspace.config.get(ExtensionConfigKeys.LSTrace)), alt$1(function () { return fromNullable(nova.config.get(ExtensionConfigKeys.LSTrace)); }), chain(function (value) {
                return fromEither(union(literal("error"), literal("off"), literal("warning")).decode(value));
            }), getOrElseW(function () { return "off"; })),
        },
        skipInstallPackageConfirmation: false,
        onlyUpdateDiagnosticsOnSave: false,
    },
}); };
/*
 * Main
 */
var elmExtension = none;
var compositeDisposable = new CompositeDisposable();
var ElmExtension = /** @class */ (function () {
    function ElmExtension() {
        this.languageClient = none;
        this.start();
    }
    ElmExtension.prototype.start = function () {
        var _this = this;
        showNotification("Starting extension...");
        var safeStart = pipe$1(sequenceSeqArray([
            tryCatch(function () {
                return new Promise(function (resolve, reject) {
                    var process = new Process("/usr/bin/env", {
                        args: ["npm", "install", "--only=prod", "--no-audit"],
                        cwd: nova.extension.globalStoragePath,
                    });
                    process.onDidExit(function (status) { return (status === 0 ? resolve() : reject()); });
                    process.start();
                });
            }, function () { return ({ _tag: "installDepsError", reason: "Failed to install extension deps." }); }),
            tryCatch(function () {
                return new Promise(function (resolve, reject) {
                    var elmJSON = nova.path.join(nova.workspace.path || "", "elm.json");
                    if (isFalse(nova.workspace.contains(elmJSON))) {
                        reject();
                    }
                    pipe$1(_this.languageClient, map(function (oldClient) {
                        oldClient.stop();
                        nova.subscriptions.remove(compositeDisposable);
                        _this.languageClient = none;
                    }));
                    var newClient = new LanguageClient("elmLS", nova.extension.name, {
                        path: mkExtensionDepsPath("elm-language-server"),
                        type: "stdio",
                    }, {
                        initializationOptions: getClientSettings(),
                        syntaxes: ["elm"],
                    });
                    compositeDisposable.add(newClient.onDidStop(function (err) {
                        var message = nova.localize("Elm Language Server stopped unexpectedly");
                        if (err) {
                            message += ":\n\n" + err.toString();
                        }
                        else {
                            message += ".";
                        }
                        message += "\n\n" + nova.localize("Please report this, along with any output in the Extension Console.");
                        nova.workspace.showActionPanel(message, { buttons: [nova.localize("Restart"), nova.localize("Ignore")] }, function (idx) {
                        });
                    }));
                    nova.subscriptions.add(compositeDisposable);
                    _this.languageClient = some(newClient);
                    resolve();
                });
            }, function () { return ({ _tag: "configureError", reason: "Failed to configure language server." }); }),
            tryCatch(function () {
                return new Promise(function (resolve, _reject) {
                    pipe$1(_this.languageClient, map(function (client) {
                        // client.start();
                    }));
                    resolve();
                });
            }, function () { return ({ _tag: "startError", reason: "Failed to start language server." }); }),
        ]));
        safeStart().then(fold$1(function (err) {
            lib.match(err)
                .with({ _tag: "installDepsError" }, function (_a) {
                var reason = _a.reason;
                return console.error(reason);
            })
                .with({ _tag: "configureError" }, function (_a) {
                var reason = _a.reason;
                return console.error(reason);
            })
                .with({ _tag: "startError" }, function (_a) {
                var reason = _a.reason;
                return console.error(reason);
            })
                .exhaustive();
        }, function () { return console.log("Activated 🎉. Happy Elm-ing :)"); }));
    };
    ElmExtension.prototype.stop = function () {
        var _this = this;
        var safeShutdown = pipe$1(tryCatch(function () {
            return new Promise(function (resolve, _reject) {
                pipe$1(_this.languageClient, map(function (client) {
                    client.stop();
                    nova.subscriptions.remove(compositeDisposable);
                    _this.languageClient = none;
                }));
                resolve();
            });
        }, function () { return ({ _tag: "shutdownError", reason: "Uh oh... Failed to deactivate plugin." }); }));
        safeShutdown().then(fold$1(function (err) {
            lib.match(err)
                .with({ _tag: "shutdownError" }, function (_a) {
                var reason = _a.reason;
                return console.error(reason);
            })
                .exhaustive();
        }, function () { return console.log("Deactivated. Come back soon :)"); }));
    };
    return ElmExtension;
}());
var activate = function () {
    console.log("Activating...");
    showNotification("Starting extension...");
    var extension = new ElmExtension();
    extension.start();
    elmExtension = some(extension);
};
var deactivate = function () {
    console.log("Deactivating...");
    pipe$1(elmExtension, fold(constVoid, function (extension) {
        extension.stop();
        elmExtension = none;
    }));
};

exports.ElmExtension = ElmExtension;
exports.activate = activate;
exports.deactivate = deactivate;
//# sourceMappingURL=main.dist.js.map
