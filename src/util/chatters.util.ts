import { Chatters } from "../api/chatters.api";
import followsApi, { FollowedChannel, User } from "../api/follows.api";
import foundersApi, { Founder } from "../api/founders.api";
import { formatDate, getDuration } from "./time.util";

export const mergeChatters = (chatters: Chatters): string[] => {
    return [...chatters.broadcasters, ...chatters.moderators, ...chatters.vips, ...chatters.viewers];
};

export const parseChatterFollows = async (chatter: string): Promise<string[]> => {
    try {
        const follows: FollowedChannel[] = await followsApi.getFollows(chatter);
        return follows.map((v) => v.login);
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getVips = async (channel: string): Promise<string> => {
    try {
        const vips: User[] = await followsApi.getVips(channel);
        return formatUsers(vips);
    } catch (err) {
        return "";
    }
};

export const getMods = async (channel: string): Promise<string> => {
    try {
        const mods: User[] = await followsApi.getMods(channel);
        return formatUsers(mods);
    } catch (err) {
        return "";
    }
};

export const getFounders = async (channel: string): Promise<string> => {
    try {
        const founders: Founder[] = await foundersApi.getFounders(channel);
        return formatFounders(founders);
    } catch (err) {
        return "";
    }
};

export const formatUsers = (users: User[]): string => {
    return users
        .map(
            (u) =>
                `${u.login} / ${formatDate(new Date(u.granted_at))} (${getDuration(new Date(u.granted_at))})`
        )
        .join("\n");
};

export const formatFounders = (founders: Founder[]): string => {
    return founders
        .map(
            (f) =>
                `${f.isSubscribed ? "[SUBSCRIBED]" : "[          ]"} ${f.login} / ${formatDate(
                    new Date(f.entitlementStart)
                )} (${getDuration(new Date(f.entitlementStart))})`
        )
        .join("\n");
};
