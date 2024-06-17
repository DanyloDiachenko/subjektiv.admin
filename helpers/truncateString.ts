export const truncateString = (string: string, spliceNumber: number) => {
    if (string) {
        return string.length > spliceNumber
            ? string.slice(0, spliceNumber - 1) + "..."
            : string;
    }
};
