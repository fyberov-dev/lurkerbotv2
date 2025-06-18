import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";

export type SendToChatAfterFNInstance = (message: string, current: number) => void;

export type SendToChatAfterFN = (n: number) => SendToChatAfterFNInstance;

export const sendToChatAfter = (n: number) => {
    return (message: string, current: number) => {
        if (current % n === 0) {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :${message}`);
        }
    };
};
