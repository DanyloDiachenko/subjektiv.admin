import assert from 'assert';

/**
 * Typed version of Object.fromEntries
 */
const objectFromEntries = <
    OKey extends PropertyKey,
    OValue,
    Entries extends readonly [OKey, OValue],
>(
    entries: ReadonlyArray<Entries>,
) =>
    Object.fromEntries(entries) as {
        [K in (typeof entries)[number][0]]: (typeof entries)[number] extends readonly [K, infer V]
            ? V
            : never;
    };

export default objectFromEntries;

// region Test
const entries = [
    ['a', 1],
    ['b', '2'],
    ['c', new Date()],
    ['d', { e: 5 }],
] as const;

const object = objectFromEntries(entries);
assert.ok(object.a === 1);
assert.ok(object.b === '2');
assert.ok(object.c instanceof Date);
assert.ok(object.d.e === 5);
// endregion
