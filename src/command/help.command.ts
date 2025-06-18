import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { joinedChannelsByBot } from "../util/chat.util";
import { helpUrl } from "../util/help.util";

const execute = (from: string) => {
    botSocket.send(`PRIVMSG #${from} :${helpUrl}`);
};

export default { execute };
