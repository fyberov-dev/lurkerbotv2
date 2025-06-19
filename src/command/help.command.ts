import { botSocket } from "../socket/bot.socket";
import { helpUrl } from "../util/help.util";

const execute = (from: string) => {
    botSocket.send(`PRIVMSG #${from} :${helpUrl}`);
};

export default { execute };
