import {lectures} from '../lectureLoader';
import {days} from './days';
import {capitalize} from './text';

function verticalSeperator(width, type) {
    let res;
    if(width > 1) {
        // For the unicode characters used see https://www.unicode.org/charts/PDF/U2500.pdf
        res = "\u2500".repeat(width - 2);
        switch(type) {
            case "top":
                res = "\u250c" + res + "\u2510";
                break;
            case "middle":
                res = "\u251c" + res + "\u2524";
                break;
            case "bottom":
                res = "\u2514" + res + "\u2518";
                break;
        }
    } else {
        // This should probably not happen in normal operation and is only here to prevent crashes if it does
        res = "-".repeat(width);
    }

    return res;
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
        if (lecture.name.length + 4 > width) {
            width = lecture.name.length + 4;
        }
    }

    let message = "";
    let lastTime = "";

    const dayString = capitalize(days[day]);

    const dayPreFiller = ' '.repeat(Math.floor((width - dayString.length) / 2) - 1);
    const dayPostFiller = ' '.repeat(Math.ceil((width - dayString.length) / 2) - 1);

    message += "```\n";
    message += verticalSeperator(width, "top");
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
            message += verticalSeperator(width, "middle");
            message += `\n\u2502${timePreFiller}${time}${timePostFiller}\u2502`
            message += `\n\u2502${' '.repeat(width - 2)}\u2502`
        }

        message += `\n\u2502${namePreFiller}${name}${namePostFiller}\u2502`

        lastTime = time;
    }

    message += "\n"
    message += verticalSeperator(width, "bottom");

    message += "```";
    return message
}
