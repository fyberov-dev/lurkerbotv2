import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { lurking } from "../util/lurk.util";
import { isPermitted } from "../util/permit.util";
import { clearUserWatch, removeUser, usersToWatch } from "./watch.user.command";

/**
 * Stop watching user messages.
 *
 * @param user user to stop lurking
 */
const execute = (executor: string, user: string) => {
    if (!user || !isPermitted(executor)) return;
    clearUserWatch(user);
    const indexOfUser: number = lurking.indexOf(user);
    delete lurking[indexOfUser];
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :stopped lurking: ${user}`);
};

export default {
    execute,
};
