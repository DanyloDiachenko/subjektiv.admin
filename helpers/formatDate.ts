export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", options);

    const dateParts = formattedDate.match(
        /(\w+) (\d+), (\d+), (\d+:\d+) ([APap][Mm])/,
    );
    if (dateParts) {
        const [, month, day, year, time, period] = dateParts;
        return `${day} ${month} ${year}, ${time} ${period}`;
    }

    return formattedDate;
};

export const formatDateShort = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", options);

    const dateParts = formattedDate.match(/(\w+) (\d+), (\d+)/);
    if (dateParts) {
        const [, month, day, year] = dateParts;
        return `${day} ${month} ${year}`;
    }

    return formattedDate;
};
