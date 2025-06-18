import followsApi, { FollowedChannel } from "../api/follows.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { isPermitted } from "../util/permit.util";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, channel: string, user: string): Promise<void> => {
    if (!user || !channel) return;
    try {
        const follows: FollowedChannel[] = await followsApi.getFollows(user);
        const follow: FollowedChannel | undefined = follows.find((f) => f.login === channel);
        if (follow) {
            botSocket.send(
                `PRIVMSG #${MAIN_CHANNEL} :User ${user} is following #${channel} since ${formatDate(
                    new Date(follow.followedAt)
                )} (${getDuration(new Date(follow.followedAt))})`
            );
        } else {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :User ${user} is not following #${channel}`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
