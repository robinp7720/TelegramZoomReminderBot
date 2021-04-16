import {lectures} from '../lectureLoader';

export function allRoute(req, res, next) { 

    let lecturesCopy = [...lectures];

    lecturesCopy.sort((a, b) => {
        if (a.day > b.day || a.time[0] > b.time[0] || a.time[1] > b.time[1])
            return -1;
        else return 1;
    });

    const date = new Date();

    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // create time offset to show current event even 10 minutes after start
    // time
    minutes -= 10;

    if (minutes > 0) {
        minutes %= 60;
        hours--;
    }

    if (hours > 0) {
        hours %= 24;
        day = (day - 1) % 7;
    }

    for (let i = 0; i < lecturesCopy.length; i++) {
        // find the first already passed lecture
        if (lecturesCopy[i].date <= day && lecturesCopy[i].time[0] <= hours && lecturesCopy[i].time[1] <= minutes) {
            // move future lectures to the end of the list
            // first element is the next lecture
            lecturesCopy.push(...lecturesCopy.splice(0, i - 2));
            break;
        }
    }

    res.json(200, lecturesCopy);
}
