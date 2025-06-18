import pasteApi, { KeyResponse } from "../api/paste.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { getVips } from "../util/chatters.util";

const execute = async (executor: string, channel: string) => {
    if (!channel) return;
    try {
        const message: string = await getVips(channel);
        if (message) {
            const response: KeyResponse = await pasteApi.post(message);
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :https://paste.ivr.fi/raw/${response.key}`);
        } else {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :User ${channel} has no vips`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
