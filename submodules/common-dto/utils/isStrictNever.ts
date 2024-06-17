export function isStrictNever(x: never): asserts x is never {
    throw new Error(`Never case reached with unexpected value ${x}`);
}

export const isWeakNever = (x: never): void => {
    // eslint-disable-next-line unicorn/error-message,no-console
    console.error(`Never case reached with unexpected value ${x} in ${new Error().stack}`);
};
