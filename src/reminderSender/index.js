import {bot} from '../bot';
import {chatid, IN_PERSON_TIME, ONLINE_TIME} from '../config';
import {lectures} from '../lectureLoader';

export const reminderSender = async function (lecture) {
    console.log('Sending reminder for', lecture.name);

    let message = `${lecture.name} startet in ${ONLINE_TIME} Minuten.\nhttps://zb.robindecker.me/${lectures.indexOf(lecture)}`;

    if (lecture.url === 'in_person') {
        message = `${lecture.name} startet in ${IN_PERSON_TIME} Minuten.\n Die VO findet in ${lecture.location} statt.`;
    }

    // Add optional information to message such as Webinar-IDs and Passwords
    // These don't need to be specified in the lectures.json file, but if they are
    // It is beneficial to show them.
    if (lecture.zoomid)
        message += `\nWebinar-ID: ${lecture.zoomid}`;
    if (lecture.password)
        message += `\nKenncode: ${lecture.password}`;

    await Promise.all(lecture.channels.map(channel => bot.telegram.sendMessage(channel, message)))
}
