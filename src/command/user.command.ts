import channelApi, { Broadcaster } from "../api/channel.api";
import pasteApi, { KeyResponse } from "../api/paste.api";
import { botSocket } from "../socket/bot.socket";
import { formatUserData } from "../util/user.util";

const execute = async (executor: string, from: string, channel: string): Promise<void> => {
    if (!channel) return;
    try {
        const user: Broadcaster = await channelApi.getUser(channel);
        const message: string = await formatUserData(user);
        const response: KeyResponse = await pasteApi.post(message);
        botSocket.send(`PRIVMSG #${from} :https://paste.ivr.fi/raw/${response.key}`);
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
