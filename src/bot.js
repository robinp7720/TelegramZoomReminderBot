import {Telegraf} from 'telegraf';
import {telegramToken} from './config';

export const bot = new Telegraf(telegramToken);
