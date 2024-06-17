export default function isNotNullish<T>(value: T | null | undefined | void): value is T {
    return value !== null && value !== undefined;
}
