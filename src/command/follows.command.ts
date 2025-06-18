import followsApi, { FollowedChannel } from "../api/follows.api";
import pasteApi, { KeyResponse } from "../api/paste.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { joinedChannelsByBot } from "../util/chat.util";
import { isPermitted } from "../util/permit.util";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, from: string, user: string): Promise<void> => {
    if (!user) return;
    try {
        const follows: FollowedChannel[] = await followsApi.getFollows(user);
        let message: string = "";
        follows.map((f: FollowedChannel) => {
            message += `[${f.isLive ? "*" : " "}] ${f.displayName} ${formatDate(
                new Date(f.followedAt)
            )} (${getDuration(new Date(f.followedAt))}) \n`;
        });
        const response: KeyResponse = await pasteApi.post(message);
        botSocket.send(`PRIVMSG #${from} :https://paste.ivr.fi/raw/${response.key}`);
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
