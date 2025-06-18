import { addMention } from "../util/mention.util";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string, word: string) => {
    if (!word) return;
    addMention(executor, word);
};

export default { execute };
