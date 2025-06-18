import clipApi, { Clip } from "../api/clip.api";

export const getClips = async (broadcasterId: string): Promise<Clip[]> => {
    const clips = await clipApi.getClips(broadcasterId);
    return clips;
};

export const getTopThree = async (broadcasterId: string): Promise<Clip[]> => {
    const clips = await getClips(broadcasterId);
    const sortedClipsByViews = clips.sort((a, b) => b.view_count - a.view_count);
    return sortedClipsByViews.slice(0, 3);
};
