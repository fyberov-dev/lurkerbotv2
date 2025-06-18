import { addMention, deleteMention } from "../util/mention.util";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string, word: string) => {
    if (!word) return;
    deleteMention(executor, word);
};

export default { execute };
