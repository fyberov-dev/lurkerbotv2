import pasteApi, { KeyResponse } from "../api/paste.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { getFounders } from "../util/chatters.util";
import { isPermitted } from "../util/permit.util";

const execute = async (executor: string, channel: string): Promise<void> => {
    if (!channel) return;
    try {
        const message: string = await getFounders(channel);
        if (message) {
            const response: KeyResponse = await pasteApi.post(message);
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :https://paste.ivr.fi/raw/${response.key}`);
        } else {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :User ${channel} has no founders`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
