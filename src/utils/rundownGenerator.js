import {lectures} from '../lectureLoader';
import {days} from './days';
import {capitalize} from './text';

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
    message += "-".repeat(width);
    message += `\n|${dayPreFiller}${dayString}${dayPostFiller}|`
    for (let lecture of lecturesToday) {
        const time = `${lecture.time[0]}:${lecture.time[1]}`;
        const name = lecture.name;

        const timePreFiller = ' '.repeat(Math.floor((width - time.length) / 2) - 1);
        const timePostFiller = ' '.repeat(Math.ceil((width - time.length) / 2) - 1);

        const namePreFiller = ' '.repeat(Math.floor((width - name.length) / 2) - 1);
        const namePostFiller = ' '.repeat(Math.ceil((width - name.length) / 2) - 1);

        if (lastTime !== time) {
            message += "\n"
            message += "-".repeat(width);
            message += `\n|${timePreFiller}${time}${timePostFiller}|`
            message += `\n|${' '.repeat(width - 2)}|`
        }

        message += `\n|${namePreFiller}${name}${namePostFiller}|`

        lastTime = time;
    }

    message += "\n"
    message += "-".repeat(width);

    message += "```";
    return message
}
