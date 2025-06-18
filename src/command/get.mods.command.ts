import followsApi, { User } from "../api/follows.api";
import pasteApi, { KeyResponse } from "../api/paste.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { getMods } from "../util/chatters.util";
import { isPermitted } from "../util/permit.util";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, channel: string) => {
    if (!channel) return;
    try {
        const message: string = await getMods(channel);
        if (message) {
            const response: KeyResponse = await pasteApi.post(message);
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :https://paste.ivr.fi/raw/${response.key}`);
        } else {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :User ${channel} has no mods`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
