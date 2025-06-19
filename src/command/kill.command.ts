import { MAIN_CHANNEL, OWNER } from "../app";
import { botSocket } from "../socket/bot.socket";

const execute = (executor: string, from: string): void => {
    if (executor !== OWNER) return;
    botSocket.send(`PRIVMSG #${from} :Killing bot..`);
    process.exit(0);
};

export default { execute };
