import { getCurrentDate } from "../util/time.util";
import { Chalk } from "chalk";

export enum LoggerType {
    LURKER = "LURKER",
    BOT = "BOT",
    MESSAGE = "MESSAGE",
    JOIN = "JOIN",
    COMMAND = "COMMAND",
    MENTION = "MENTION",
}

export interface LoggerInstance {
    log(message: string): void;
    error(message: string): void;
}

export type Logger = (chalk: Chalk, type: LoggerType) => LoggerInstance;

export const logger: Logger = (chalkInstance, type) => {
    return {
        log: (message) => {
            console.log(chalkInstance(`[${getCurrentDate()}] [${type}] ${message}`));
        },
        error: (message) => {
            console.error(chalkInstance.bgRed(`[ERROR] [${getCurrentDate()}] [${type}] ${message}`));
        },
    };
};
