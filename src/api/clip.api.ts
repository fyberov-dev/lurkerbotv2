export interface Clip {
    id: string;
    url: string;
    broadcaster_id: string;
    creator_id: string;
    creator_name: string;
    title: string;
    duration: string;
    view_count: number;
    created_at: string;
    is_featured: boolean;
    video_id: string;
    vod_offset: number;
}

const getClips = async (broadcasterId: string): Promise<Clip[]> => {
    const response: Response = await fetch(
        `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TWITCH_API_KEY}`,
                "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error("Something went bad");
    }
    const { data }: { data: Clip[] } = await response.json();
    return data;
};

export default {
    getClips,
};
