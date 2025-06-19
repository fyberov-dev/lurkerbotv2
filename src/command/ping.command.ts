import { START_TIME } from "../app";
import { botSocket } from "../socket/bot.socket";
import { getDuration } from "../util/time.util";

const execute = (from: string) => {
    botSocket.send(`PRIVMSG #${from} :PONG! Bot is up for ${getDuration(START_TIME)}`);
};

export default { execute };
