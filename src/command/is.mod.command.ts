import followsApi, { User } from "../api/follows.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { isPermitted } from "../util/permit.util";
import { formatDate, getDuration } from "../util/time.util";

const execute = async (executor: string, from: string, channel: string, user: string): Promise<void> => {
    if (!user || !channel) return;
    try {
        const mods: User[] = await followsApi.getMods(channel);
        const mod: User | undefined = mods.find((v) => v.login === user);
        if (mod) {
            botSocket.send(
                `PRIVMSG #${from} :User ${user} is moderator at #${channel} since ${formatDate(
                    new Date(mod.granted_at)
                )} (${getDuration(new Date(mod.granted_at))})`
            );
        } else {
            botSocket.send(`PRIVMSG #${from} :User ${user} is not moderator at #${channel}`);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
