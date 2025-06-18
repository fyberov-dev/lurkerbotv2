import { MAIN_CHANNEL, OWNER } from "../app";
import { botSocket } from "../socket/bot.socket";

export const permittedUsers: Set<string> = new Set<string>();

export const permit = (user: string): void => {
    if (permittedUsers.has(user)) {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :permit rejected: ${user}`);
        permittedUsers.delete(user);
    } else {
        botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :permit granted: ${user}`);
        permittedUsers.add(user);
    }
};

export const isPermitted = (user: string): boolean => {
    return user === OWNER || permittedUsers.has(user);
};
