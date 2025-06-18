import { lurkerSockets } from "../socket/lurker.socket";

export const getAllJoinedChannels = (): string[] => {
    const channels: string[] = [];
    for (let lurkerSocket of lurkerSockets) {
        channels.push(...lurkerSocket.joinedChats);
    }
    return channels;
};

export const isJoined = (channel: string): boolean => {
    for (let lurkerSocket of lurkerSockets) {
        if (lurkerSocket.joinedChats.has(channel)) {
            return true;
        }
    }
    return false;
};
