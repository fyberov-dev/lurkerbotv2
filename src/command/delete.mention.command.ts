import { deleteMention } from "../util/mention.util";

const execute = (executor: string, word: string): void => {
    if (!word) return;
    deleteMention(executor, word);
};

export default { execute };
