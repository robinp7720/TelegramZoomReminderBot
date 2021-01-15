import {bot} from '../bot';
import {chatid} from '../config';
import {lectures} from '../lectureLoader';

export const reminderSender = async function (lecture) {
    console.log('Sending reminder for', lecture.name);

    let message = `${lecture.name} startet in 5 Minuten.\nhttps://zb.robindecker.me/${lectures.indexOf(lecture)}`;
    if (lecture.password)
        message += `\nKenncode: ${lecture.password}`;

    await bot.telegram.sendMessage(chatid, message);
}
