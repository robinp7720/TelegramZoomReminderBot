import {lectures} from '../lectureLoader';
import {days} from './days';
import {capitalize} from './text';

function horizontalSeperator(width, type) {
    if(width < 2) return "";

    // For the unicode characters used see https://www.unicode.org/charts/PDF/U2500.pdf
    const line = "\u2500".repeat(width - 2);

    switch(type) {
        case "top":
            return "\u250c" + line + "\u2510";
        case "middle":
            return "\u251c" + line + "\u2524";
        case "bottom":
            return "\u2514" + line + "\u2518";
    }
}

export function rundownGenerator(channelID) {
    let width = 0;

    const date = new Date();
    const day = date.getDay();

    // Filter out all channels with the wrong channel id or which don't occur today
    const lecturesToday = lectures.filter(lecture => lecture.channels.indexOf(channelID) > -1 && lecture.day === day);

    lecturesToday.sort((a, b) => {
        const a_time = (a.day * 60 * 24) + (a.time[0] * 60 + a.time[1]);
        const b_time = (b.day * 60 * 24) + (b.time[0] * 60 + b.time[1]);
        return a_time - b_time;
    });

    for (let lecture of lecturesToday) {
        if (lecture.name.length + 10 > width) {
            width = lecture.name.length + 10;
        }
    }

    let message = "";
    let lastTime = "";

    const dayString = capitalize(days[day]);

    const dayPreFiller = ' '.repeat(Math.floor((width - dayString.length) / 2) - 1);
    const dayPostFiller = ' '.repeat(Math.ceil((width - dayString.length) / 2) - 1);

    message += "```\n";
    message += horizontalSeperator(width, "top");
    message += `\n\u2502${dayPreFiller}${dayString}${dayPostFiller}\u2502`
    for (let lecture of lecturesToday) {
        const time = `${lecture.time[0]}:${lecture.time[1]}`;
        const name = lecture.name;

        const timePreFiller = ' '.repeat(Math.floor((width - time.length) / 2) - 1);
        const timePostFiller = ' '.repeat(Math.ceil((width - time.length) / 2) - 1);

        const namePreFiller = ' '.repeat(Math.floor((width - name.length) / 2) - 1);
        const namePostFiller = ' '.repeat(Math.ceil((width - name.length) / 2) - 1);

        if (lastTime !== time) {
            message += "\n"
            message += horizontalSeperator(width, "middle");
            message += `\n\u2502${timePreFiller}${time}${timePostFiller}\u2502`
            message += `\n\u2502${' '.repeat(width - 2)}\u2502`
        }

        message += `\n\u2502${namePreFiller}${name}${namePostFiller}\u2502`

        lastTime = time;
    }

    message += "\n"
    message += horizontalSeperator(width, "bottom");

    message += "```";
    return message
}
