import chalk from "chalk";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";
import { checkIfActive, checkIfMessage, checkIfPing } from "../util/status.util";
import { MAIN_CHANNEL } from "../app";
import event from "../event";

export interface LurkerSocket {
    id: number;
    socket: WebSocket;
    joinedChats: Set<string>;
    temp: number;
    isActive: boolean;
}

export const lurkerSockets: LurkerSocket[] = [];

const lurkerLogger: LoggerInstance = logger(chalk.magenta, LoggerType.LURKER);

const addLurkerSocket = (): void => {
    const socket: WebSocket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    const currentSocketId: number = lurkerSockets.length + 1;

    const lurkerSocket: LurkerSocket = {
        id: currentSocketId,
        socket: socket,
        joinedChats: new Set<string>(),
        temp: 0,
        isActive: true,
    };

    socket.onopen = (): void => {
        lurkerLogger.log(`lurker ${currentSocketId} socket up`);

        socket.send("CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands");
        socket.send(`NICK justinfan${currentSocketId}`);
    };

    socket.onmessage = ({ data }: MessageEvent<string>): void => {
        if (checkIfActive(data)) {
            socket.send(`JOIN #${MAIN_CHANNEL}`);
            lurkerLogger.log(`lurker ${currentSocketId} connected to the #${MAIN_CHANNEL}`);
        } else if (checkIfPing(data)) {
            socket.send("PONG :tmi.twitch.tv");
        } else if (checkIfMessage(data)) {
            event.onMessage(currentSocketId, data);
        }
    };

    socket.onclose = (): void => {
        lurkerLogger.error(`lurker ${currentSocketId} connection is closed...`);
        lurkerSocket.isActive = false;
    };

    lurkerSockets.push(lurkerSocket);
};

export default { addLurkerSocket };
