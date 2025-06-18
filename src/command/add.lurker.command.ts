import chalk from "chalk";
import lurkerSocket from "../socket/lurker.socket";
import { OWNER } from "../app";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";

const lurkerLogger: LoggerInstance = logger(chalk.magenta, LoggerType.LURKER);

const execute = (executor: string, amount: number): void => {
    if (!amount || executor !== OWNER) {
        return;
    }
    for (let i = 0; i < amount; i++) {
        lurkerSocket.addLurkerSocket();
        lurkerLogger.log("added new lurker");
    }
};

export default {
    execute,
};
