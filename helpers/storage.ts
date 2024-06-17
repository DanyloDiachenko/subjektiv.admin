export const storage = {
    setItem: (name: string, item: any) => {
        localStorage.setItem(name, JSON.stringify(item));
    },

    getItem: (name: string) => {
        if (typeof localStorage !== "undefined") {
            const item = localStorage.getItem(name);
            if (item && item !== "undefined") {
                return JSON.parse(item);
            }
        }
    },
};
