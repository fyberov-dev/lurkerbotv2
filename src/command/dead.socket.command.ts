import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { lurkerSockets } from "../socket/lurker.socket";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string, from: string): void => {
    if (!isPermitted(executor)) return;
    const deadSockets: number[] = lurkerSockets
        .filter((socket) => !socket.isActive)
        .map((socket) => socket.id);
    const deadSocketsStringEnum: string = deadSockets.join(",");
    botSocket.send(
        `PRIVMSG #${from} :${
            deadSocketsStringEnum ? "dead sockets: " + deadSocketsStringEnum : "all sockets are up"
        }`
    );
};

export default {
    execute,
};
