import objectEntries from './objectEntries';

export function castEnum<
    const TestString extends string,
    const From extends Record<string, string>,
    const To extends Record<string, string>,
    const Result extends {
        [K in keyof To]: `${To[K]}` extends `${TestString}` ? To[K] : never;
    }[keyof To],
>(
    testValue: `${TestString}` & `${From[keyof From]}` & `${To[keyof To]}`,
    from: From,
    to: To,
): Result {
    const entries = objectEntries(to);
    const entry = entries.find(([, value]) => value === testValue);
    if (!entry) {
        throw new Error(`Value ${testValue} not found in enum ${Object.values(to)}`);
    }

    const [, foundValue] = entry;
    return foundValue as Result;
}
