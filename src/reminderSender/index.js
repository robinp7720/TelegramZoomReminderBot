import {bot} from '../bot';
import {chatid} from '../config';
import {lectures} from '../lectureLoader';

export const reminderSender = async function (lecture) {
    console.log('Sending reminder for', lecture.name);

    let message = `${lecture.name} startet in 5 Minuten.\nhttps://zb.robindecker.me/${lectures.indexOf(lecture)}`;

    // Add optional information to message such as Webinar-IDs and Passwords
    // These don't need to be specified in the lectures.json file, but if they are
    // It is beneficial to show them.
    if (lecture.zoomid)
        message += `\nWebinar-ID: ${lecture.zoomid}`;
    if (lecture.password)
        message += `\nKenncode: ${lecture.password}`;

    await bot.telegram.sendMessage(chatid, message);
}
