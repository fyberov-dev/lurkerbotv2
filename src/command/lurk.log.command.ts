import pasteApi, { KeyResponse } from "../api/paste.api";
import { botSocket } from "../socket/bot.socket";
import { lurking } from "../util/lurk.util";
import { getMessagesFromBuffer, getMessagesFromLurkingBuffer } from "../util/message.util";
import { isPermitted } from "../util/permit.util";
import { currentlyLurkedChannel } from "./lurk.channel.command";

const execute = async (executor: string, from: string, channel: string): Promise<void> => {
    if (!isPermitted(executor)) return;
    if (channel && lurking.includes(channel)) {
        const messages: string[] = getMessagesFromBuffer(channel);
        if (messages.length > 0) {
            const response: KeyResponse = await pasteApi.post(messages.join("\n"));
            botSocket.send(`PRIVMSG #${from} :https://paste.ivr.fi/${response.key}`);
        } else {
            botSocket.send(`PRIVMSG #${from} :User did not write anything`);
        }
    } else if (!channel && currentlyLurkedChannel) {
        const messages: string[] = getMessagesFromLurkingBuffer();
        console.log(messages);
        if (messages.length > 0) {
            const response: KeyResponse = await pasteApi.post(messages.join("\n"));
            botSocket.send(`PRIVMSG #${from} :https://paste.ivr.fi/${response.key}`);
        } else {
            botSocket.send(`PRIVMSG #${from} :Channel logs are empty`);
        }
    } else {
        botSocket.send(`PRIVMSG #${from} :You are not lurking anything`);
    }
};

export default { execute };
