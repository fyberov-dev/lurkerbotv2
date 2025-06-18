import { addMention } from "../util/mention.util";

const execute = (executor: string, word: string) => {
    if (!word) return;
    addMention(executor, word);
};

export default { execute };
