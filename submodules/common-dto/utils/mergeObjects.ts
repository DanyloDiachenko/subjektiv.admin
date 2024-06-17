import assert from 'assert';

export const mergeObjects = <
    K extends PropertyKey,
    V,
    R extends Record<K, V>,
    O extends Partial<R>,
>(
    objects: ReadonlyArray<O>,
): UnionToIntersection<O> => Object.assign({}, ...objects);

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;

// region Test
const object1 = { a: 1, b: 2 } as const;
const object2 = { c: 3 } as const;
const object3 = { d: 4 } as const;

const merged = mergeObjects([object1, object2, object3]);
assert.ok(merged.a === 1);
assert.ok(merged.b === 2);
assert.ok(merged.c === 3);
assert.ok(merged.d === 4);
// endregion
