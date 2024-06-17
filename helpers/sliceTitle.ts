export const sliceTitle = (title: string, numberToSlice: number) => {
    if (title.length > numberToSlice) {
        return title.slice(0, numberToSlice) + "...";
    }

    return title;
};
