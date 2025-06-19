import followsApi, { User } from "../api/follows.api";
import { botSocket } from "../socket/bot.socket";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, from: string, channel: string, user: string): Promise<void> => {
    if (!user || !channel) return;
    try {
        const vips: User[] = await followsApi.getVips(channel);
        const vip: User | undefined = vips.find((v) => v.login === user);
        if (vip) {
            botSocket.send(
                `PRIVMSG #${from} :User ${user} is vip at #${channel} since ${formatDate(
                    new Date(vip.granted_at)
                )} (${getDuration(new Date(vip.granted_at))})`
            );
        } else {
            botSocket.send(`PRIVMSG #${from} :User ${user} is not vip at #${channel}`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
