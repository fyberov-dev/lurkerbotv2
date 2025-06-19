import pasteApi, { KeyResponse } from "../api/paste.api";
import { botSocket } from "../socket/bot.socket";
import { getMods } from "../util/chatters.util";

const execute = async (executor: string, from: string, channel: string) => {
    if (!channel) return;
    try {
        const message: string = await getMods(channel);
        if (message) {
            const response: KeyResponse = await pasteApi.post(message);
            botSocket.send(`PRIVMSG #${from} :https://paste.ivr.fi/raw/${response.key}`);
        } else {
            botSocket.send(`PRIVMSG #${from} :User ${channel} has no mods`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
