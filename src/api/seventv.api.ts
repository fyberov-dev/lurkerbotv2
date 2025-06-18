export interface SevenTVUser {
    id: string;
    username: string;
    created_at: string;
    editors: SevenTVEditors[];
}

export interface SevenTVEditors {
    id: string;
    added_at: string;
    name: string;
}

export interface SevenTVEmoteSet {
    id: string;
    name: string;
}

export interface SevenTVProfile {
    id: string;
    username: string;
    user: SevenTVUser;
    emote_set: SevenTVEmoteSet;
}

const getProfile = async (broadcasterId: string): Promise<SevenTVProfile> => {
    const response: Response = await fetch(`https://7tv.io/v3/users/twitch/${broadcasterId}`);
    if (!response.ok) {
        throw new Error("Something bad happened");
    }
    const data: SevenTVProfile = await response.json();
    return data;
};

const getEditorProfile = async (editorId: string): Promise<SevenTVProfile> => {
    const response: Response = await fetch(`https://7tv.io/v3/users/${editorId}`);
    if (!response.ok) {
        throw new Error("Something bad happened");
    }
    const data: SevenTVProfile = await response.json();
    return data;
};

export default { getProfile, getEditorProfile };
