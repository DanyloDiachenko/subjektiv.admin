export type AssertCondition<T extends boolean> = T extends true ? true : never;

export const assertCondition = <const Condition extends boolean>(
    condition: Condition,
): asserts condition is Condition & true => {
    if (condition !== true) throw 'Invalid assertion';
};

export const notNullAndReturn = <T, Nullable = T | null>(value: Nullable): T => {
    if (value === null) throw 'Invalid assertion';
    return value as T;
};
