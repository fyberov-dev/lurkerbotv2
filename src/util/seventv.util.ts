import seventvApi, { SevenTVEditors, SevenTVProfile } from "../api/seventv.api";

export const getSevenTVProfile = async (broadcasterId: string): Promise<SevenTVProfile | null> => {
    try {
        const profile: SevenTVProfile = await seventvApi.getProfile(broadcasterId);
        return profile;
    } catch (error) {
        return null;
    }
};

export const getSevenTVEditorProfile = async (editorProfile: string): Promise<SevenTVProfile | null> => {
    try {
        const profile: SevenTVProfile = await seventvApi.getEditorProfile(editorProfile);
        return profile;
    } catch (error) {
        return null;
    }
};

export const getEditorNames = async (profile: SevenTVProfile): Promise<SevenTVEditors[]> => {
    const editorNames: SevenTVEditors[] = [];
    for (let editor of profile.user.editors) {
        const editorProfile: SevenTVProfile | null = await getSevenTVEditorProfile(editor.id);
        if (editorProfile) {
            editor.name = editorProfile.username;
            editorNames.push(editor);
        }
    }
    return editorNames;
};
