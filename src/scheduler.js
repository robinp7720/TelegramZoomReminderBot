import NodeScheduler from 'node-schedule'
import {reminderSender} from './reminderSender';

export let schedules = [];

export const scheduleLecture = (lecture) => {
    console.log('Setting up scheduler for', lecture.name);

    let hour = parseInt(lecture.time[0]);
    let minute = parseInt(lecture.time[1]) - 5;

    // If minute is less then 0, it means that the reminder should
    // be sent in the previous hour, so subtract one from the hour.
    if (minute < 0) {
        minute =  60 + minute
        hour--;
    }

    let rule = new NodeScheduler.RecurrenceRule(
        null,
        null,
        null,
        parseInt(lecture.day),
        hour,
        minute,
        0)

    schedules.push(NodeScheduler.scheduleJob(rule, async function () {
        await reminderSender(lecture);
    }))
}
