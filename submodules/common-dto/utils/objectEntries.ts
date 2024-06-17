/**
 * Typed version of Object.entries
 */
export default function objectEntries<K extends string | symbol, T>(entity: {
    [key in K]?: T;
}): [K, T][] {
    return Object.entries(entity) as [K, T][];
}
