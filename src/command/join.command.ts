import { OWNER } from "../app";
import { joinChannel } from "../util/join.util";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string, channel: string) => {
    if (!channel || !isPermitted(executor)) {
        return;
    }
    joinChannel(channel);
};

export default {
    execute,
};
