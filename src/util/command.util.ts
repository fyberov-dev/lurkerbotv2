import { MessageData, parseMessage } from "./message.util";
import { checkIfCommand } from "./status.util";

export interface CommandData extends Omit<MessageData, "message"> {
    command: string;
    properties: string[];
}

export const parseCommand = (data: string): CommandData | null => {
    const messageData: MessageData | null = parseMessage(data);
    if (!messageData || !checkIfCommand(messageData.message)) {
        return null;
    }
    const commandChars: string[] = getCommandChars(messageData.message);
    return {
        username: messageData.username,
        channel: messageData.channel,
        command: commandChars[0],
        properties: commandChars.slice(1),
    };
};

const getCommandChars = (data: string): string[] => {
    return data
        .split(" ")
        .slice(1)
        .map((v) => v.toLocaleLowerCase());
};
