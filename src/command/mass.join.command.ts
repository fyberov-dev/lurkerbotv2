import chalk from "chalk";
import chattersApi, { Chat } from "../api/chatters.api";
import { MAIN_CHANNEL, OWNER } from "../app";
import { logger, LoggerInstance, LoggerType } from "../logger/logger";
import { botSocket } from "../socket/bot.socket";
import { mergeChatters, parseChatterFollows } from "../util/chatters.util";
import { joinChannels } from "../util/join.util";
import { sendToChatAfter, SendToChatAfterFNInstance } from "../util/chat.util";
import { sleep } from "../util/mention.util";

const joinLogger: LoggerInstance = logger(chalk.green, LoggerType.JOIN);

const execute = async (executor: string, from: string, channel: string): Promise<void> => {
    if (!channel || executor != OWNER) {
        return;
    }
    botSocket.send(`PRIVMSG #${from} : parsing #${channel} chatters`);
    const chat: Chat = await chattersApi.getChatters(channel);
    const chatters: string[] = mergeChatters(chat.chatters);
    botSocket.send(`PRIVMSG #${from} :got ${chatters.length} chatters. getting chats to join`);
    const channelsToJoin: Set<string> = new Set();
    const chatLog: SendToChatAfterFNInstance = sendToChatAfter(100);
    for (const [index, chatter] of chatters.entries()) {
        parseChatterFollows(chatter).then((data) => {
            data.forEach((d) => channelsToJoin.add(d));
            joinLogger.log(`parsing chatters: ${index}/${chatters.length}`);
            chatLog(`parsing chatters: ${index}/${chatters.length}`, index);
        });
        await sleep(100);
    }

    await sleep(3000);

    botSocket.send(
        `PRIVMSG #${from} :parsed ${chatters.length} chatters from #${channel}. joining ${channelsToJoin.size} chats.`
    );

    joinChannels([...channelsToJoin]);
};

export default { execute };
