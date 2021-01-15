import NodeScheduler from 'node-schedule'
import {reminderSender} from './reminderSender';

export let schedules = [];

export const scheduleLecture = (lecture) => {
    console.log('Setting up scheduler for', lecture.name);
    let rule = new NodeScheduler.RecurrenceRule(null, null, null, parseInt(lecture.day), parseInt(lecture.time[0]), parseInt(lecture.time[1])-5, 0)

    schedules.push(NodeScheduler.scheduleJob(rule, async function () {
        await reminderSender(lecture);
    }))
}
