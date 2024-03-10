export const getDateandTime = (timestamp, timeZone) => {
    const date = new Date((timestamp + timeZone) * 1000);
    const dateOptions = {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    }
    const formattedTime = getTime(timestamp, timeZone);
    const formattedDate = date.toLocaleString('en-US', dateOptions);
    return `${formattedTime}, ${formattedDate}`;
}

export const getTime = (timestamp, timeZone) => {
    const date = new Date((timestamp + timeZone) * 1000);
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
    }
    const formattedTime = date.toLocaleString('en-US', timeOptions);
    return `${formattedTime.toLowerCase()}`;
}

export const capitalizeEachWord = (string) => {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
};