import { checkMentions } from "../util/mention.util";

const execute = (executor: string): void => {
    checkMentions(executor);
};

export default { execute };
