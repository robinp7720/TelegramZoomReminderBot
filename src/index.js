import {lectures, loadLectures} from './lectureLoader';
import {scheduleLecture} from './scheduler';

import {bot} from './bot';

import thankyouResponder from './commandHandlers/thankyouResponder';
import lectureCommand from './commandHandlers/lectures';
import registerCommand from './commandHandlers/register'
import {zoomProxyServer} from './zoomProxy';
import {reminderSender} from './reminderSender';

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
    bot.hears(/Danke*/gi, thankyouResponder)

    await bot.launch();
})();


zoomProxyServer.listen(3455);
