import chalk from "chalk";
import { logger, LoggerType } from "../logger/logger";
import { botSocket } from "../socket/bot.socket";
import { MAIN_CHANNEL } from "../app";
import { isPermitted } from "../util/permit.util";

const useChatLogger = logger(chalk.magenta, LoggerType.COMMAND);

// export const usersToWatch: string[] = [];

export const usersToWatch: { [key: string]: string[] } = {};

const execute = (executor: string, from: string, user: string): void => {
    if (
        !user ||
        !isPermitted(executor) ||
        (!Object.keys(usersToWatch).includes(from) && from !== MAIN_CHANNEL)
    )
        return;
    if (usersToWatch[from].includes(user)) {
        removeUser(user, from);
    } else {
        addUser(user, from);
    }
};

const addUser = (user: string, from: string): void => {
    botSocket.send(`PRIVMSG #${from} :watching ${user}...`);
    useChatLogger.log(`watching ${user}`);
    if (from in usersToWatch) {
        usersToWatch[from].push(user);
    } else {
        usersToWatch[from] = [user];
    }
};

export const removeUser = (user: string, from: string): void => {
    botSocket.send(`PRIVMSG #${from} :end ${user}`);
    useChatLogger.log(`not watching ${user}`);
    const indexOfUser: number = usersToWatch[from].indexOf(user);
    delete usersToWatch[from][indexOfUser];
};

export const isWatched = (user: string): string | null => {
    for (const [key, value] of Object.entries(usersToWatch)) {
        if (value.includes(user)) {
            return key;
        }
    }
    return null;
};

export default {
    execute,
};
