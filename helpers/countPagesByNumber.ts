export const countPagesByNumber = (pages: number): number[] => {
    const pagesArr: number[] = [];

    for (let i = 1; i <= pages; i++) {
        pagesArr.push(i);
    }

    return pagesArr;
};
