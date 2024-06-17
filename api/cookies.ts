export const getCookie = (name: string) => {
    let cookieValue = "";
    if (document && document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (const cooky of cookies) {
            const cookie = cooky.trim();
            if (cookie.slice(0, Math.max(0, name.length + 1)) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.slice(Math.max(0, name.length + 1)),
                );
                break;
            }
        }
    }
    return cookieValue;
};

export const setCookie = (
    name: string,
    value: string,
    days?: number,
    expiresValue?: () => string,
) => {
    const date = new Date(expiresValue ? expiresValue() : "");
    days && date.setDate(date.getDate() + days);
    document.cookie = name + "=" + value + ";path=/; expires=" + date;
    return value;
};
