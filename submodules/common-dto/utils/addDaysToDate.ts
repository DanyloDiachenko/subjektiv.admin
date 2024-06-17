export default function addDaysToDate(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + Math.round(days));
    return result;
}
