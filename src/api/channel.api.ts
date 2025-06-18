type BroadcasterType = "affiliate" | "partner" | "";

export type Roles = {
    isAffiliate: boolean;
    isPartner: boolean;
    isStaff: null | boolean;
};

export type Badge = {
    setID: string;
    title: string;
    description: string;
};

export type ChatSettings = {
    chatDelayMs: number;
    followersOnlyDurationMinutes: number | null;
    slowModeDurationSeconds: number | null;
    blockLinks: boolean;
    isSubscribersOnlyModeEnabled: boolean;
    isEmoteOnlyModeEnabled: boolean;
    isFastSubsModeEnabled: boolean;
    isUniqueChatModeEnabled: boolean;
    requireVerifiedAccount: boolean;
    rules: string[];
};

export type Game = {
    displayName: string;
};

export type Stream = {
    title: string;
    id: string;
    createdAt: string;
    type: string;
    viewersCount: number;
    game: Game;
};

export type LastBroadcast = {
    startedAt: string | null;
    title: string | null;
};

export type Panel = {
    id: string;
};

export interface Broadcaster {
    banned: boolean;
    banReason: string | undefined;
    displayName: string;
    login: string;
    id: string;
    bio: string;
    followers: string;
    createdAt: string;
    updatedAt: string;
    roles: Roles;
    badges: Badge[];
    chatterCount: number;
    chatSettings: ChatSettings;
    stream: Stream | null;
    lastBroadcast: LastBroadcast;
    panels: Panel[];
}

const getUser = async (channel: string): Promise<Broadcaster> => {
    const response: Response = await fetch(`https://api.ivr.fi/v2/twitch/user?login=${channel}`);
    if (!response.ok) {
        throw new Error("Something bad happened");
    }
    const data: Broadcaster[] = await response.json();
    return data[0];
};

export default {
    getUser,
};
