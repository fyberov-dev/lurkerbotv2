import chalk from "chalk";
import { logger, LoggerType } from "../logger/logger";
import { botSocket } from "../socket/bot.socket";
import { MAIN_CHANNEL } from "../app";
import { isPermitted } from "../util/permit.util";

const useChatLogger = logger(chalk.magenta, LoggerType.COMMAND);

export const usersToWatch: string[] = [];

const execute = (executor: string, user: string): void => {
    if (!user || !isPermitted(executor)) return;
    if (usersToWatch.includes(user)) {
        removeUser(user);
    } else {
        addUser(user);
    }
};

const addUser = (user: string): void => {
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :watching ${user}...`);
    useChatLogger.log(`watching ${user}`);
    usersToWatch.push(user);
};

export const removeUser = (user: string): void => {
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :end ${user}`);
    useChatLogger.log(`not watching ${user}`);
    const indexOfUser: number = usersToWatch.indexOf(user);
    delete usersToWatch[indexOfUser];
};

export default {
    execute,
};
