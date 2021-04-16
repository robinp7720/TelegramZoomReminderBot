import {lectures} from '../lectureLoader';
import {capitalize} from '../utils/text';
import {days, getDay} from '../utils/days';

export default async ctx => {
    await ctx.reply(JSON.stringify(ctx.getChat()));
}
