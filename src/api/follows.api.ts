export interface FollowedChannel {
    id: string;
    displayName: string;
    login: string;
    avatar: string;
    followedAt: string;
    isLive: string;
}

export interface User {
    id: string;
    displayName: string;
    login: string;
    avatar: string;
    granted_at: string;
    banned: boolean;
}

const getFollows = async (channel: string): Promise<FollowedChannel[]> => {
    const response: Response = await fetch("https://tools.2807.eu/api/getfollows/" + channel.toLowerCase());
    if (!response.ok) {
        throw new Error("Something went bad");
    }
    const data: FollowedChannel[] = await response.json();
    return data;
};

const getVips = async (channel: string): Promise<User[]> => {
    const response: Response = await fetch(`https://tools.2807.eu/api/getvips/${channel}`);
    if (!response.ok) {
        throw new Error("Something bad happened");
    }
    const data: User[] = await response.json();
    return data;
};

const getMods = async (channel: string): Promise<User[]> => {
    const response: Response = await fetch(`https://tools.2807.eu/api/getmods/${channel}`);
    if (!response.ok) {
        throw new Error("Something bad happened");
    }
    const data: User[] = await response.json();
    return data;
};

export default {
    getFollows,
    getVips,
    getMods,
};
