import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";

const execute = (from: string) => {
    botSocket.send(`PRIVMSG #${from} :PONG!`);
};

export default { execute };
