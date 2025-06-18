import { LurkerSocket, lurkerSockets } from "../socket/lurker.socket";

export const getLurkerWithMinJoinedChannels = (): LurkerSocket => {
    let socketWithMinChannels: LurkerSocket = lurkerSockets[0];
    for (let socket of lurkerSockets) {
        if (socket.joinedChats.size < socketWithMinChannels.joinedChats.size) {
            socketWithMinChannels = socket;
        }
    }
    return socketWithMinChannels;
};
