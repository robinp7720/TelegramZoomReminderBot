import {rundownGenerator} from '../utils/rundownGenerator';

export default async ctx => {
    try {
        await ctx.reply(rundownGenerator((await ctx.getChat()).id), {
            parse_mode: 'MarkdownV2'
        });
    } catch (e) {
        console.log('Something got fucked up');
    }

}
