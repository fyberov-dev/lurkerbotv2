import { OWNER } from "../app";
import { leaveChat } from "../util/chat.util";

const execute = (executor: string, channel: string) => {
    if (!channel || executor !== OWNER) return;
    leaveChat(channel);
};

export default { execute };
