import chalk from "chalk";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";
import { checkIfActive, checkIfMessage, checkIfPing } from "../util/status.util";
import { MAIN_CHANNEL } from "../app";
import event from "../event";

const botLogger: LoggerInstance = logger(chalk.yellow, LoggerType.BOT);

const createBotSocket = () => {
    const socket: WebSocket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    socket.onopen = (): void => {
        botLogger.log("bot socket up");

        socket.send("CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands");
        socket.send(`PASS ${process.env.TWITCH_API_OAUTH}`);
        socket.send(`NICK ${process.env.TWITCH_USERNAME}`);
    };

    socket.onmessage = ({ data }: MessageEvent<string>): void => {
        if (checkIfActive(data)) {
            socket.send(`JOIN #${MAIN_CHANNEL}`);
            botLogger.log(`bot socket connected to the ${MAIN_CHANNEL}`);
        } else if (checkIfPing(data)) {
            socket.send("PONG :tmi.twitch.tv");
            botLogger.log(`PONG!`);
        } else if (checkIfMessage(data)) {
            event.onCommand(data);
        }
    };

    return socket;
};

export const botSocket: WebSocket = createBotSocket();
