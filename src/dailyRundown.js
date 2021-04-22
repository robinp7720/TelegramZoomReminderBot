import {lectures} from './lectureLoader';
import {days} from './utils/days';
import {capitalize} from './utils/text';

export function dailyRundown() {
    const width = 35;

    const date = new Date();
    const day = date.getDay();

    const dayString = capitalize(days[day]);

    const dayPreFiller = ' '.repeat(Math.floor((width - dayString.length) / 2) - 1);
    const dayPostFiller = ' '.repeat(Math.ceil((width - dayString.length) / 2) - 1);

    const lecturesToday = lectures.filter(lecture => lecture.day === day);

    lecturesToday.sort((a, b) => {
        const a_time = (a.day * 60 * 24) + (a.time[0] * 60 + a.time[1]);
        const b_time = (b.day * 60 * 24) + (b.time[0] * 60 + b.time[1]);
        return a_time - b_time;
    });

    //let message = "Guten Morgen liebe Faulpelze\n" +
    //    "Hier ist eur Rundown für heute\n";

    let message = "";

    let lastTime = "";
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
