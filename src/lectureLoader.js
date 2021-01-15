import {lecturesPath} from './config';

const {promises: fs} = require('fs');

export let lectures;

export const loadLectures = async () => {
    lectures = JSON.parse(await fs.readFile(lecturesPath))
};
