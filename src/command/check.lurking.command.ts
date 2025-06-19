import { botSocket } from "../socket/bot.socket";
import { lurking } from "../util/lurk.util";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string, from: string): void => {
    if (!isPermitted(executor)) return;
    botSocket.send(`PRIVMSG #${from} :lurking users: ${lurking.join(",")}`);
};

export default { execute };
