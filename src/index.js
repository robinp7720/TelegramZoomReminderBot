import {lectures, loadLectures} from './lectureLoader';
import {scheduleLecture} from './scheduler';

import {bot} from './bot';

import thankyouResponder from './commandHandlers/thankyouResponder';
import lectureCommand from './commandHandlers/lectures';
import registerCommand from './commandHandlers/register'
import deleteCommand from './commandHandlers/delete'
import {zoomProxyServer} from './zoomProxy';
import zoomyResponder from './commandHandlers/zoomyResponder';
import getID from './commandHandlers/getID';
import {rundownGenerator} from './utils/rundownGenerator';
import NodeScheduler from 'node-schedule';
import rundownCommand from './commandHandlers/rundown';

(async () => {
    await loadLectures();

    console.log('Lecture list loaded. Count:', lectures.length);

    for (let lecture of lectures) {
        scheduleLecture(lecture);
    }

    bot.start(async (ctx) => {
        console.log(await ctx.getChat());
    });

    bot.command('register', registerCommand);
    bot.command('delete', deleteCommand);
    bot.command('lectures', lectureCommand);
    //bot.command('getID', getID);
    bot.command('rundown', rundownCommand);
    //bot.hears(/danke?/gi, thankyouResponder)

    //bot.on('text', zoomyResponder)

    await bot.launch();

    let rule = new NodeScheduler.RecurrenceRule(
        null,
        null,
        null,
        null,
        8,
        0,
        0)

    NodeScheduler.scheduleJob(rule, async function () {
        try {
            const date = new Date();
            const day = date.getDay();
            const lecturesToday = lectures.filter(lecture => lecture.channels.indexOf(-1001210469683) > -1 && lecture.day === day);

            if (lecturesToday.length === 0) return;

            await bot.telegram.sendMessage(-1001210469683, "Guten Morgen! Habt ihr gut geschlafen? Hier ist euer Rundown für Heute:");
            await bot.telegram.sendMessage(-1001210469683, rundownGenerator(-1001210469683), {
                parse_mode: 'MarkdownV2'
            });
        } catch (e) {
            console.log('An error occurred while posting the rundown', e);
        }
    });


})();

zoomProxyServer.listen(3455);
