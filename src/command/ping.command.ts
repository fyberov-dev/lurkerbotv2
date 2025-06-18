import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";

const execute = () => {
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :PONG!`);
};

export default { execute };
