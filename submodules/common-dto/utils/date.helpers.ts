export function daysToMSec(days: number): number {
    return days * 24 * 60 * 60 * 1000;
}

export function hoursToMSec(hours: number): number {
    return hours * 60 * 60 * 1000;
}

export function minutesToMSec(minutes: number): number {
    return minutes * 60 * 1000;
}

export function hoursToDays(hours: number): number {
    return hours / 24;
}
