import followsApi, { FollowedChannel } from "../api/follows.api";
import { botSocket } from "../socket/bot.socket";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, from: string, channel: string, user: string): Promise<void> => {
    if (!user || !channel) return;
    try {
        const follows: FollowedChannel[] = await followsApi.getFollows(user);
        const follow: FollowedChannel | undefined = follows.find((f) => f.login === channel);
        if (follow) {
            botSocket.send(
                `PRIVMSG #${from} :User ${user} is following #${channel} since ${formatDate(
                    new Date(follow.followedAt)
                )} (${getDuration(new Date(follow.followedAt))})`
            );
        } else {
            botSocket.send(`PRIVMSG #${from} :User ${user} is not following #${channel}`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
