import { MAIN_CHANNEL, OWNER } from "../app";
import { botSocket } from "../socket/bot.socket";

const execute = (executor: string): void => {
    if (executor !== OWNER) return;
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :Killing bot..`);
    process.exit(0);
};

export default { execute };
