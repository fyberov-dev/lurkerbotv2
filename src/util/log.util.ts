import pasteApi, { KeyResponse } from "../api/paste.api";
import { logCooldown, MAIN_CHANNEL } from "../app";
import { currentlyLurkedChannel } from "../command/lurk.channel.command";
import { botSocket } from "../socket/bot.socket";
import { isLurkingActive } from "./lurk.util";
import {
    clearLurkedChannelMessageBuffer,
    clearMessageBuffer,
    getAndFormatMessages,
    getAndFormatMessagesFromChat,
    lurkedChannelMessageBuffer,
    messageBuffer,
} from "./message.util";

export const intervalLog = () => {
    setInterval(async () => {
        try {
            if (isLurkingActive && messageBuffer.length) {
                let messages: string = "";
                Object.entries(messageBuffer).forEach(([k, v]) => {
                    messages += getAndFormatMessages(k, v);
                });
                if (lurkedChannelMessageBuffer.length && currentlyLurkedChannel) {
                    messages += getAndFormatMessagesFromChat(lurkedChannelMessageBuffer);
                }
                const response: KeyResponse = await pasteApi.post(messages);
                botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :https://paste.ivr.fi/${response.key}`);
                clearMessageBuffer();
                clearLurkedChannelMessageBuffer();
            }
        } catch (err) {
            console.log(err);
        }
    }, logCooldown);
};
