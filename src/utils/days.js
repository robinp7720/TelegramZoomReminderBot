export const days = ['sonntag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag']

export const getDay = (input) => {
    if (!isNaN(parseInt(input))) {
        return parseInt(input);
    }

    return days.indexOf(input.toLowerCase());
}
