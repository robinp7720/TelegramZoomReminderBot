import {dailyRundown} from '../dailyRundown';

export default async ctx => {
    await ctx.reply(dailyRundown(), {
        parse_mode: 'MarkdownV2'
    });
}
