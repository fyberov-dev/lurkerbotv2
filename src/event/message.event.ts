import chalk from "chalk";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";
import {
    addMessageToBuffer,
    addMessageToLurkedChannelBuffer,
    MessageData,
    parseMessage,
} from "../util/message.util";
import { MAIN_CHANNEL } from "../app";
import { lurking } from "../util/lurk.util";
import { usersToWatch } from "../command/watch.user.command";
import { botSocket } from "../socket/bot.socket";
import { getCurrentDate } from "../util/time.util";
import { LurkerSocket, lurkerSockets } from "../socket/lurker.socket";
import { currentlyLurkedChannel } from "../command/lurk.channel.command";
import { sendMention, whoMentioned } from "../util/mention.util";

const messageLogger: LoggerInstance = logger(chalk.gray, LoggerType.MESSAGE);

export const onMessage = (id: number, data: string): void => {
    const messageData: MessageData | null = parseMessage(data);
    if (!messageData || messageData.channel === MAIN_CHANNEL) {
        return;
    } else if (lurking.length && lurking.includes(messageData.username)) {
        const message = `[#${messageData.channel}] ${messageData.username}: ${messageData.message}`;
        messageLogger.log(chalk.bgYellowBright(message));
        addMessageToBuffer(messageData.username, message);
        if (usersToWatch.includes(messageData.username)) {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :[${getCurrentDate()}] ${message}`);
        }
    } else {
        const currentSocket: LurkerSocket = lurkerSockets[id - 1];
        currentSocket.temp++;
        if (currentSocket.temp % 2500 === 0) {
            messageLogger.log(`socket ${id} is UP`);
        }
    }

    if (messageData.channel === currentlyLurkedChannel) {
        const message = `[${getCurrentDate()}] {#${messageData.channel}} ${messageData.username}: ${
            messageData.message
        }`;
        messageLogger.log(chalk.bgBlue(message));
        addMessageToLurkedChannelBuffer(message);
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} : ${message}`);
    }

    const mentioned: string | null = whoMentioned(messageData.message);
    if (mentioned) {
        const message = `(@${mentioned}) [${getCurrentDate()}] [#${messageData.channel}] ${
            messageData.username
        }: ${messageData.message}`;
        sendMention(message);
    }
};
