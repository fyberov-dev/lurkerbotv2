import followsApi, { FollowedChannel } from "../api/follows.api";
import { lurk } from "../util/lurk.util";
import { isPermitted } from "../util/permit.util";

const execute = async (executor: string, users: string): Promise<void> => {
    if (!users || !isPermitted(executor)) return;
    const usersToLurk: string[] = users.split(",");
    try {
        for (let userToLurk of usersToLurk) {
            const response: FollowedChannel[] = await followsApi.getFollows(userToLurk);
            if (!response.length) return;
            await lurk(userToLurk, response);
        }
    } catch (err) {
        console.log(err);
    }
};

export default { execute };
