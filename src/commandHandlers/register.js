import {getDay} from '../utils/days';
import {lectures} from '../lectureLoader';
import {scheduleLecture} from '../scheduler';
import {promises as fs} from 'fs';
import {lecturesPath} from '../config.js';

export default async ctx => {
    let input = ctx.message.text.split(' ');

    console.log(input, input.length)

    if (input.length !== 5 && input.length !== 6) {
        return ctx.reply('Please use /register [time] [day of week] [name] [in_person|zoom url] [location]');
    }

    const time = input[1].split(':').map(t => parseInt(t));
    const day = getDay(input[2]);
    const channelID = (await ctx.getChat()).id;
    const location = input[5] || ''

    const url = input[4].replace('#success','');

    if (time.length !== 2) return ctx.reply('Invalid time');

    if (time[0] > 23 || time[0] < 0) return ctx.reply('Invalid time');
    if (time[1] > 59 || time[1] < 0) return ctx.reply('Invalid time');

    if (day === -1) return ctx.reply('Kein gültiger Tag.');

    let lecture = {
        time,
        day,
        name: input[3].replace(/_/g, ' '),
        url,
        channels: [channelID],
        location
    }

    lectures.push(lecture);

    scheduleLecture(lecture);

    await fs.writeFile(lecturesPath, JSON.stringify(lectures, null, 4));

    await ctx.reply('Zoom lecture registered');
}
