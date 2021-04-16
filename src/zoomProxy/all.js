import {lectures} from '../lectureLoader';

export function allRoute(req, res, next) {
    // copy array so sorting can not mess up anything
    const lecturesCopy = [...lectures];
    const currentDate = new Date();

    // First sort the lectures by date and time
    lecturesCopy.sort((a, b) => {
        const a_time = (a.day * 60 * 24) + (a.time[0] * 60 + a.time[1]);
        const b_time = (b.day * 60 * 24) + (b.time[0] * 60 + b.time[1]);

        return a_time - b_time;
    });

    const beforeNow = lecturesCopy.filter((a) => {
        const a_time = (a.day * 60 * 24) + (a.time[0] * 60 + a.time[1]);
        const c_time = (currentDate.getDay() * 60 * 24) + (currentDate.getHours() * 60 + currentDate.getMinutes())
        return a_time < c_time;
    })

    const afterNow = lecturesCopy.filter((a) => {
        const a_time = (a.day * 60 * 24) + (a.time[0] * 60 + a.time[1]);
        const c_time = (currentDate.getDay() * 60 * 24) + (currentDate.getHours() * 60 + currentDate.getMinutes())
        return a_time > c_time;
    })

    res.json(200, [...afterNow, ...beforeNow]);
}
