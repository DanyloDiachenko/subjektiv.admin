export const formatEnumValue = (string: string) => {
    return string
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
