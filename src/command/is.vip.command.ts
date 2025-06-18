import followsApi, { User } from "../api/follows.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { isPermitted } from "../util/permit.util";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, channel: string, user: string): Promise<void> => {
    if (!user || !channel) return;
    try {
        const vips: User[] = await followsApi.getVips(channel);
        const vip: User | undefined = vips.find((v) => v.login === user);
        if (vip) {
            botSocket.send(
                `PRIVMSG #${MAIN_CHANNEL} :User ${user} is vip at #${channel} since ${formatDate(
                    new Date(vip.granted_at)
                )} (${getDuration(new Date(vip.granted_at))})`
            );
        } else {
            botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :User ${user} is not vip at #${channel}`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
