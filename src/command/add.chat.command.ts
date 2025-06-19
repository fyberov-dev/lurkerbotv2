import { OWNER } from "../app";
import { addChat } from "../util/chat.util";

const execute = (executor: string, channel: string): void => {
    if (!channel || executor !== OWNER) return;
    addChat(channel);
};

export default { execute };
