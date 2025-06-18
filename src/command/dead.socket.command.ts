import { MAIN_CHANNEL, OWNER } from "../app";
import { botSocket } from "../socket/bot.socket";
import { lurkerSockets } from "../socket/lurker.socket";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string) => {
    if (!isPermitted(executor)) return;
    const deadSockets: number[] = lurkerSockets
        .filter((socket) => !socket.isActive)
        .map((socket) => socket.id);
    const deadSocketsStringEnum: string = deadSockets.join(",");
    botSocket.send(
        `PRIVMSG #${MAIN_CHANNEL} :${
            deadSocketsStringEnum ? "dead sockets: " + deadSocketsStringEnum : "all sockets are up"
        }`
    );
};

export default {
    execute,
};
