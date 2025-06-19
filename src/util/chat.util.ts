import chalk from "chalk";
import { MAIN_CHANNEL } from "../app";
import { logger, LoggerType } from "../logger/logger";
import { botSocket } from "../socket/bot.socket";

const chatLogger = logger(chalk.bgBlueBright, LoggerType.CHAT);

export type SendToChatAfterFNInstance = (message: string, current: number) => void;

export type SendToChatAfterFN = (n: number) => SendToChatAfterFNInstance;

export const sendToChatAfter = (n: number) => {
    return (message: string, current: number) => {
        if (current % n === 0) {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :${message}`);
        }
    };
};

export const joinedChannelsByBot: Set<string> = new Set();

export const addChat = (channel: string): void => {
    joinedChannelsByBot.add(channel);
    botSocket.send(`JOIN #${channel}`);
    chatLogger.log(`BOT JOINED #${channel}`);
};

export const leaveChat = (channel: string): void => {
    joinedChannelsByBot.delete(channel);
    chatLogger.log(`BOT LEFT #${channel}`);
};
