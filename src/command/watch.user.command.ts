import chalk from "chalk";
import { logger, LoggerType } from "../logger/logger";
import { botSocket } from "../socket/bot.socket";
import { MAIN_CHANNEL } from "../app";
import { isPermitted } from "../util/permit.util";
import { getCurrentDate } from "../util/time.util";

const useChatLogger = logger(chalk.magenta, LoggerType.COMMAND);

export const usersToWatch: { [key: string]: Set<string> } = {};

const execute = (executor: string, from: string, user: string): void => {
    if (!user || !isPermitted(executor)) return;
    if (usersToWatch[from] && usersToWatch[from].has(user)) {
        removeUser(user, from);
    } else {
        addUser(user, from);
    }
};

const addUser = (user: string, from: string): void => {
    botSocket.send(`PRIVMSG #${from} :watching ${user}...`);
    useChatLogger.log(`watching ${user}`);
    if (from in usersToWatch) {
        usersToWatch[from].add(user);
    } else {
        usersToWatch[from] = new Set([user]);
    }
};

export const removeUser = (user: string, from: string): void => {
    botSocket.send(`PRIVMSG #${from} :end ${user}`);
    useChatLogger.log(`not watching ${user}`);
    usersToWatch[from].delete(user);
};

export const clearUserWatch = (user: string): void => {
    for (const key of Object.keys(usersToWatch)) {
        usersToWatch[key].delete(user);
    }
};

export const logMessages = (user: string, message: string): void => {
    for (const [key, value] of Object.entries(usersToWatch)) {
        if (value.has(user)) {
            botSocket.send(`PRIVMSG #${key} : [${getCurrentDate()}] ${message}`);
        }
    }
};

export default {
    execute,
};
