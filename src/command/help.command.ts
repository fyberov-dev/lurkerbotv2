import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { helpUrl } from "../util/help.util";

const execute = () => {
    botSocket.send(`PRIVMSG #${MAIN_CHANNEL} :${helpUrl}`);
};

export default { execute };
