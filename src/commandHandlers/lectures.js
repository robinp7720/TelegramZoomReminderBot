import {lectures} from '../lectureLoader';
import {capitalize} from '../utils/text';
import {days, getDay} from '../utils/days';

export default async ctx => {
    let input = ctx.message.text.split(' ');
    let sortDate = -1;

    if (input[1]) {
        sortDate = getDay(input[1])
    }

    let message = "";

    for (const lecture of lectures) {
        if (sortDate > -1 && parseInt(lecture.day) !== sortDate)
            continue;

        message += `${lecture.name} - ${lecture.time[0]}:${lecture.time[1]} - ${capitalize(days[lecture.day])}\n`
    }

    try {
        await ctx.reply(message)
    } catch (e) {
        console.log('Something got fucked up');
        console.error(e);
    }

}
