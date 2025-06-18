import { currentlyLurkedChannel } from "../command/lurk.channel.command";
import { MESSAGE_REGEX } from "./status.util";
import { getCurrentDate } from "./time.util";

export interface MessageData {
    username: string;
    channel: string;
    message: string;
}

type MessageBuffer = { [key: string]: string[] };

export const messageBuffer: MessageBuffer = {};
export const lurkedChannelMessageBuffer: string[] = [];

export const parseMessage = (data: string): MessageData | null => {
    const match: RegExpMatchArray | null = data.match(MESSAGE_REGEX);
    if (!match) {
        return null;
    }
    const [_, username, channel, message] = match;
    return {
        username: username.toLowerCase(),
        channel: channel.toLowerCase(),
        message,
    };
};

export const addMessageToBuffer = (user: string, message: string) => {
    message = `[${getCurrentDate()}] ${message}`;
    if (user in messageBuffer) {
        messageBuffer[user].push(message);
    } else {
        messageBuffer[user] = [message];
    }
};

export const addMessageToLurkedChannelBuffer = (message: string) => {
    lurkedChannelMessageBuffer.push(message);
};

export const getAndFormatMessages = (user: string, messages: string[]): string => {
    let str = `${user}:\n`;
    for (let message of messages) {
        str += `${message}\n`;
    }
    str += "\n";
    return str;
};

export const getAndFormatMessagesFromChat = (messages: string[]): string => {
    let log = `LURKED CHANNEL: ${currentlyLurkedChannel}`;
    for (let message of messages) {
        log += `\n${message}`;
    }
    return log;
};

export const clearMessageBuffer = () => {
    Object.keys(messageBuffer).forEach((k) => {
        delete messageBuffer[k];
    });
};

export const clearLurkedChannelMessageBuffer = () => {
    lurkedChannelMessageBuffer.length = 0;
};
