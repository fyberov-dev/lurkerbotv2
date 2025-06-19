import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { isJoined } from "../util/channel.util";
import { isPermitted } from "../util/permit.util";

/**
 * Check if Bot is joined to the channel.
 *
 * Send 'true' to the chat if the bot is joined to the channel, otherwise sends 'false'
 *
 * @param channel channel to check
 */
const execute = (executor: string, from: string, channel: string): void => {
    if (!channel || !isPermitted(executor)) return;
    botSocket.send(`PRIVMSG #${from} :${channel}=${isJoined(channel)}`);
};

export default {
    execute,
};
