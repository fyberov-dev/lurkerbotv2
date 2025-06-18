import { MAIN_CHANNEL, OWNER } from "../app";
import { botSocket } from "../socket/bot.socket";
import { isJoined } from "../util/channel.util";
import { joinChannel } from "../util/join.util";
import { makeLurkingActive } from "../util/lurk.util";
import { clearLurkedChannelMessageBuffer } from "../util/message.util";
import { isPermitted } from "../util/permit.util";

export let currentlyLurkedChannel: string | null = null;

const execute = (executor: string, channel: string): void => {
    if (!isPermitted(executor)) return;
    if (!channel) {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :stopped lurking #${currentlyLurkedChannel} channel`);
        clearLurkedChannelMessageBuffer();
        currentlyLurkedChannel = null;
    } else {
        if (!isJoined(channel)) {
            joinChannel(channel);
        }
        currentlyLurkedChannel = channel;
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :started lurking #${currentlyLurkedChannel} channel`);
        makeLurkingActive();
    }
};

export default {
    execute,
};
