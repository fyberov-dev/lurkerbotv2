import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";

const execute = (executor: string, channel: string): void => {
    if (!channel) return;
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :https://logs.awoo.nl/?history=${channel}&limit=1000`);
};

export default { execute };
