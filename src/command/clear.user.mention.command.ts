import { clearUserMentions } from "../util/mention.util";
import { isPermitted } from "../util/permit.util";

const execute = (executor: string, user: string): void => {
    if (!user || !isPermitted(executor)) return;
    clearUserMentions(user);
};

export default { execute };
