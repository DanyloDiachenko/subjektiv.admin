export default function shortenDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) {
        return description;
    }

    // Remove all HTML/XML tags from the description
    const cleanDescription = description.replace(/<[^>]*>/g, '');

    // Remove all new lines and tabs from the description
    const trimmedDescription = cleanDescription.replace(/[\t\n]/g, '');

    // Cut the description to the max desired length
    let shortenedDescription = trimmedDescription.slice(0, Math.max(0, maxLength));

    // Make sure the description ends with a full word
    const lastIndex = shortenedDescription.lastIndexOf(' ');

    shortenedDescription = shortenedDescription.slice(0, Math.max(0, lastIndex)).trim();

    return `${shortenedDescription}...`;
}
