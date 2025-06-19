import { botSocket } from "../socket/bot.socket";

const execute = (executor: string, from: string, channel: string): void => {
    if (!channel) return;
    botSocket.send(`PRIVMSG #${from} :https://logs.awoo.nl/?history=${channel}&limit=1000`);
};

export default { execute };
