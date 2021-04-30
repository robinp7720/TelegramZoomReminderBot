import {rundownGenerator} from '../utils/rundownGenerator';

export default async ctx => {
    await ctx.reply(rundownGenerator((await ctx.getChat()).id), {
        parse_mode: 'MarkdownV2'
    });
}
