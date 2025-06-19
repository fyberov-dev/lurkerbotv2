/**
 * @returns
 */
export const getCurrentDate = (): string => {
    const date: Date = new Date(Date.now());
    return `${formatDay(date)} ${formatTime(date)}`;
};

export const formatDate = (date: Date): string => {
    return `${formatDay(date)} ${formatTime(date)}`;
};

/**
 * @returns current day (using format DD.MM.YYYY)
 */
const formatDay = (date: Date): string => {
    // prettier-ignore
    return `${formatNumber(date.getDate())}.${formatNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
};

/**
 * @returns current time (using format HH:MM:SS)
 */
const formatTime = (date: Date): string => {
    // prettier-ignore
    return `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`;
};

/**
 * Format date value. If value is less than 10, use format "0X", otherwise "XX"
 *
 *
 * @param value value to check and format
 * @returns formatted value
 */
const formatNumber = (value: number): string => {
    return value < 10 ? `0${value}` : String(value);
};

export const getDuration = (since: Date): string => {
    const now: Date = new Date();

    const { years, months, days }: Duration = getDateDuration(now, since);
    const { hours, minutes, seconds }: Timestamp = getTimeDuration(now, since);

    const parts = [
        years ? `${years}y` : "",
        months ? `${months}mo` : "",
        days ? `${days}d` : "",
        " ",
        hours ? `${hours}h` : "",
        minutes ? `${minutes}m` : "",
        seconds ? `${seconds}s` : "",
    ];

    return parts.join("");
};

export interface Duration {
    years: number;
    months: number;
    days: number;
}

const getDateDuration = (now: Date, since: Date): Duration => {
    let years: number = getYearsDuration(now, since);
    let months: number = getMonthsDuration(now, since);
    let days: number = getDaysDuration(now, since);

    if (days < 0) {
        months -= 1;
        const previousMath = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMath.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return {
        years,
        months,
        days,
    };
};

export interface Timestamp {
    hours: number;
    minutes: number;
    seconds: number;
}

const getTimeDuration = (now: Date, since: Date): Timestamp => {
    let diff: number = Math.abs(now.getTime() - since.getTime());
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
};

const getYearsDuration = (now: Date, since: Date): number => {
    return now.getFullYear() - since.getFullYear();
};

const getMonthsDuration = (now: Date, since: Date): number => {
    return now.getMonth() - since.getMonth();
};

const getDaysDuration = (now: Date, since: Date): number => {
    return now.getDate() - since.getDate();
};
