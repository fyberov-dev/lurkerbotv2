import { addMention, checkMentions } from "../util/mention.util";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string) => {
    checkMentions(executor);
};

export default { execute };
