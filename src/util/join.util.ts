import chalk from "chalk";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";
import { LurkerSocket, lurkerSockets } from "../socket/lurker.socket";
import { getLurkerWithMinJoinedChannels } from "./lurker.util";
import { isJoined } from "./channel.util";
import { sendToChatAfter, SendToChatAfterFNInstance } from "./chat.util";
import { botSocket } from "../socket/bot.socket";
import { MAIN_CHANNEL } from "../app";

const joinLogger: LoggerInstance = logger(chalk.green, LoggerType.JOIN);

export const joinChannel = (channel: string): void => {
    const lurkerSocket: LurkerSocket = getLurkerWithMinJoinedChannels();
    if (!isJoined(channel)) {
        lurkerSocket.joinedChats.add(channel);
        joinLogger.log(`[${lurkerSocket.id}] joined #${channel}`);
        lurkerSocket.socket.send(`JOIN #${channel}`);
    } else {
        joinLogger.error(`already joined #${channel}`);
    }
};

export const joinChannelBySocket = (channel: string, lurkerSocket: LurkerSocket): void => {
    if (!isJoined(channel)) {
        lurkerSocket.joinedChats.add(channel);
        joinLogger.log(`[${lurkerSocket.id}] joined #${channel}`);
        lurkerSocket.socket.send(`JOIN #${channel}`);
    } else {
        joinLogger.error(`already joined #${channel}`);
    }
};

export const joinChannels = (channels: string[]): void => {
    // for logs
    let currentlyJoined: number = 0;
    const chatLog: SendToChatAfterFNInstance = sendToChatAfter(500);
    const splittedChannels: string[][] = splitChannels(channels);
    for (let i = 0; i < splittedChannels.length; i++) {
        const lurkerSocket: LurkerSocket = lurkerSockets[i];
        let j = 0;
        const intervalId = setInterval(() => {
            if (j >= splittedChannels[i].length) {
                clearInterval(intervalId);
                if (lurkerSocket.id === 1) {
                    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :joined all ${channels.length} chats`);
                }
            } else {
                joinChannelBySocket(splittedChannels[i][j], lurkerSocket);
                j++;
                currentlyJoined++;
                chatLog(`joining channels: ${currentlyJoined}/${channels.length}`, currentlyJoined);
            }
        }, 500);
    }
};

const splitChannels = (channels: string[]): string[][] => {
    const socketsNum: number = lurkerSockets.length;
    const channelsBySocket = Math.ceil(channels.length / socketsNum);
    const channelsToJoinBySocket: string[][] = [];
    for (let i = 0; i < socketsNum; i++) {
        const start: number = i * channelsBySocket;
        const end: number = start + channelsBySocket;
        const channelsToJoinForSocket = channels.slice(start, end);
        channelsToJoinBySocket.push(channelsToJoinForSocket);
    }
    return channelsToJoinBySocket;
};
