import { OWNER } from "../app";
import { resetMentions } from "../util/mention.util";

const execute = (executor: string) => {
    if (executor !== OWNER) return;
    resetMentions();
};

export default { execute };
