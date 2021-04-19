import {lectures} from '../lectureLoader';
import {capitalize} from '../utils/text';
import {days, getDay} from '../utils/days';

export default async ctx => {
    const channelID = (await ctx.getChat()).id;

    let input = ctx.message.text.split(' ');
    let sortDate = -1;

    if (input[1]) {
        sortDate = getDay(input[1])
    }

    let message = "";

    // We only want to show lectures relevant to the channel where the command was executed
    const filteredLectures = lectures.filter((a) => {
        // Filter out all lectures not happening on the day specified
        if (sortDate > -1 && parseInt(a.day) !== sortDate)
            return false;

        // Filter out all lectures on for the current channel
        return a.channels.indexOf(channelID) !== -1;
    });

    // To improve the readability we'll also sort the lectures by date and time
    filteredLectures.sort((a, b) => {
        const a_time = (a.day * 60 * 24) + (a.time[0] * 60 + a.time[1]);
        const b_time = (b.day * 60 * 24) + (b.time[0] * 60 + b.time[1]);
        return a_time - b_time;
    });

    for (const lecture of filteredLectures) {
        message += `${lecture.name} - ${lecture.time[0]}:${lecture.time[1]} - ${capitalize(days[lecture.day])}\n`
    }

    try {
        await ctx.reply(message)
    } catch (e) {
        console.log('Something got fucked up');
        console.error(e);
    }

}
