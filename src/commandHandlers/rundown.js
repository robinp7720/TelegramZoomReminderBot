import {dailyRundown} from '../dailyRundown';

export default async ctx => {
    await ctx.reply(dailyRundown((await ctx.getChat()).id), {
        parse_mode: 'MarkdownV2'
    });
}
