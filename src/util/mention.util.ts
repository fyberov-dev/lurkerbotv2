import chalk from "chalk";
import { MAIN_CHANNEL } from "../app";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";
import { botSocket } from "../socket/bot.socket";

const mentionLogger: LoggerInstance = logger(chalk.magenta, LoggerType.MENTION);

const userMentions: { [key: string]: Set<string> } = {};
const mentionsBuffer: string[] = [];
let isIntervalActive: boolean = false;

export const whoMentioned = (message: string): string | null => {
    for (let [user, mentions] of Object.entries(userMentions)) {
        for (let mention of mentions) {
            if (message.includes(mention)) {
                return user;
            }
        }
    }
    return null;
};

export const addMention = (user: string, word: string): void => {
    word = word.toLowerCase();
    if (user in userMentions) {
        userMentions[user].add(word);
    } else {
        userMentions[user] = new Set([word]);
    }

    mentionLogger.log(`user ${user} added new mention: ${word}`);
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :added new mention for ${user}: ${word}`);
};

export const deleteMention = (user: string, word: string): void => {
    word = word.toLowerCase();
    const isDeleted: boolean = userMentions[user].delete(word);
    if (isDeleted) {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :deleted mention for ${user}: ${word}`);
        mentionLogger.log(`user ${user} deleted mention: ${word}`);
    } else {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :mention ${word} for ${user} doesn't exist`);
    }
};

export const clearUserMentions = (user: string): void => {
    delete userMentions[user];
};

export const checkMentions = (user: string): void => {
    const mentions: Set<string> = userMentions[user];
    if (mentions) {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :mentions for ${user}: ${[...mentions].join(",")}`);
    } else {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :@${user} you have not set up mentions`);
    }
};

export const resetMentions = (): void => {
    mentionLogger.log("mentions resetted");
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :mentions resetted`);
    mentionsBuffer.length = 0;
};

export const sleep = (ms: number): Promise<unknown> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sendMention = async (message: string): Promise<void> => {
    mentionsBuffer.push(message);
    if (!isIntervalActive) {
        isIntervalActive = true;
        while (true) {
            if (!mentionsBuffer.length) {
                isIntervalActive = false;
                break;
            }
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :${mentionsBuffer[0]}`);
            mentionsBuffer.shift();
            await sleep(2000);
        }
    }
};
