import { OWNER } from "../app";
import { permit } from "../util/permit.util";

const execute = (executor: string, user: string): void => {
    if (!user || executor !== OWNER) return;
    permit(user);
};

export default { execute };
