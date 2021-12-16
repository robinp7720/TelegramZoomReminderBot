import {lectures} from '../lectureLoader';
import {promises as fs} from 'fs';
import {lecturesPath} from '../config.js';

export default async ctx => {
    let input = ctx.message.text.split(' ');

    if (input.length !== 2) {
        ctx.reply('Please use /delete [id]');
        return true;
    }

    const deleteId = parseInt(input[1]);
    const channelID = (await ctx.getChat()).id;

    if (!lectures[deleteId]) {
        await ctx.reply('Screw off');
        return true;
    }

    if (lectures[deleteId].channels.indexOf(channelID) === -1) {
        await ctx.reply('Is that you Luca?');
        return true;
    }

    lectures.splice(deleteId, 1);

    await fs.writeFile(lecturesPath, JSON.stringify(lectures, null, 4));

    await ctx.reply('Zoom lecture deleted');

    return true;
}
