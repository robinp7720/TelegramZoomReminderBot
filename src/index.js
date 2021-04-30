import {lectures, loadLectures} from './lectureLoader';
import {scheduleLecture} from './scheduler';

import {bot} from './bot';

import thankyouResponder from './commandHandlers/thankyouResponder';
import lectureCommand from './commandHandlers/lectures';
import registerCommand from './commandHandlers/register'
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
    bot.command('lectures', lectureCommand);
    bot.command('getID', getID);
    bot.command('rundown', rundownCommand);
    bot.hears(/danke?/gi, thankyouResponder)

    bot.on('text', zoomyResponder)

    await bot.launch();
})();

zoomProxyServer.listen(3455);
