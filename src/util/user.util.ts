import { Badge, Broadcaster, LastBroadcast, Panel, Roles, Stream } from "../api/channel.api";
import { Clip } from "../api/clip.api";
import { getFounders, getMods, getVips } from "./chatters.util";
import { getTopThree } from "./clips.util";
import { formatDate, getDuration } from "./time.util";
import seventvApi, { SevenTVEditors, SevenTVProfile } from "../api/seventv.api";
import { getEditorNames, getSevenTVProfile } from "./seventv.util";

export const formatUserData = async (user: Broadcaster): Promise<string> => {
    const {
        id,
        banned,
        banReason,
        followers,
        createdAt,
        updatedAt,
        roles,
        badges,
        stream,
        lastBroadcast,
        panels,
        login,
    } = user;

    const clips: string = await formatClipsData(id);
    const vips: string = await formatVips(login);
    const mods: string = await formatMods(login);
    const founders: string = await formatFounders(login);
    const sevenTvProfile: string = await formatSevenTVProfile(id);

    const parts: string[] = [
        formatMainData(user),
        formatRoleData(roles),
        formatBannedDate(banned, banReason),
        formatFollowersData(followers),
        formatTimeData(new Date(createdAt), new Date(updatedAt)),
        formatTwitchTracker(login),
        formatStreamData(stream) ? formatStreamData(stream) : formatLastStreamData(lastBroadcast),
        formatBadgeData(badges),
        formatPanelsData(panels),
        sevenTvProfile,
        clips,
        mods,
        vips,
        founders,
    ];

    return parts.filter((v) => v).join("\n\n");
};

const formatMainData = (user: Broadcaster): string => {
    const { displayName, id, bio } = user;
    return `${displayName} (${id})\n\nBio:\n${bio ? bio : "-"}`;
};

const formatBannedDate = (banned: boolean, reason: string | undefined): string => {
    reason = reason ? reason : "NO REASON PROVIDED";
    return banned ? `User is currently banned: ${reason}\n` : "";
};

const formatRoleData = (role: Roles): string => {
    if (role?.isStaff) {
        return "USER IS STAFF MEMBER";
    } else if (role.isPartner) {
        return "USER IS PARTNER";
    } else if (role.isAffiliate) {
        return "USER IS AFFILIATE";
    } else {
        return "";
    }
};

const formatBadgeData = (badges: Badge[]): string => {
    let message: string = "Badges: \n";
    badges.forEach((badge: Badge, i: number) => {
        message += `[${i + 1}] ${badge.title}\nDescription: ${badge.description}`;
    });
    return message;
};

const formatStreamData = (stream: Stream | null): string => {
    if (stream) {
        const { id, title, createdAt, viewersCount, game } = stream;
        const createdAtDate: Date = new Date(createdAt);
        return `Currently streaming:\nTitle: ${title}\nLive since: ${formatDate(
            createdAtDate
        )} (${getDuration(createdAtDate)})\nViewers: ${viewersCount}\nCategory: ${
            game.displayName
        }\n------\n#${id}`;
    }
    return "";
};

const formatLastStreamData = (stream: LastBroadcast): string => {
    if (stream.startedAt && stream.title) {
        return `CURRENTLY OFF\n---------\nLast Broadcast:\nTitle: ${stream.title}\nStarted at: ${formatDate(
            new Date(stream.startedAt)
        )} (${getDuration(new Date(stream.startedAt))})`;
    }
    return "";
};

const formatTimeData = (createdAt: Date, updatedAt: Date): string => {
    return `Created at: ${formatDate(createdAt)} (${getDuration(createdAt)})\nLast updated at: ${formatDate(
        updatedAt
    )} (${getDuration(createdAt)})`;
};

const formatFollowersData = (followers: string): string => {
    return `Followers: ${followers}`;
};

const formatPanelsData = (panels: Panel[]): string => {
    return panels ? `Panels: ${panels.length}` : "";
};

const formatClipsData = async (broadcasterId: string): Promise<string> => {
    const clips: Clip[] = await getTopThree(broadcasterId);
    if (!clips.length) {
        return "";
    }
    let message: string = "TOP 3 CLIPS:\n---------\n";
    clips.forEach((clip: Clip, i: number) => {
        message += `#${i + 1}\nTitle: ${clip.title}\nDuration: ${clip.duration} seconds\nCreated by: ${
            clip.creator_name
        } (${clip.creator_id})\nView count: ${clip.view_count}\nCreated at: ${formatDate(
            new Date(clip.created_at)
        )} (${getDuration(new Date(clip.created_at))})\n${clip.url}\n\n`;
    });
    return message;
};

const formatVips = async (channel: string): Promise<string> => {
    try {
        const vips: string = await getVips(channel);
        return `Vips:\n${vips}`;
    } catch (err) {
        console.log(err);
        return "";
    }
};

const formatMods = async (channel: string): Promise<string> => {
    try {
        const mods: string = await getMods(channel);
        return `Moderators:\n${mods}`;
    } catch (err) {
        console.log(err);
        return "";
    }
};

const formatFounders = async (channel: string): Promise<string> => {
    try {
        const founders: string = await getFounders(channel);
        return `Founders:\n${founders}`;
    } catch (err) {
        console.log(err);
        return "";
    }
};

const formatTwitchTracker = (channel: string): string => {
    return `Twitch tracker: https://twitchtracker.com/${channel}`;
};

const formatSevenTVProfile = async (broadcasterID: string): Promise<string> => {
    try {
        const profile: SevenTVProfile | null = await getSevenTVProfile(broadcasterID);
        if (!profile) {
            return "";
        }
        const editors: SevenTVEditors[] = await getEditorNames(profile);
        return `7TV Profile:\n${profile.user.username} (${profile.user.id})\nCreated at: ${formatDate(
            new Date(profile.user.created_at)
        )} (${getDuration(new Date(profile.user.created_at))})\nProfile: https://7tv.app/users/${
            profile.user.id
        }\nEmote set: https://7tv.app/emote-sets/${profile.emote_set.id}\n${formatSevenTVEditors(editors)}`;
    } catch (err) {
        console.log(err);
        return "";
    }
};

const formatSevenTVEditors = (editors: SevenTVEditors[]): string => {
    let message: string = "Editors:\n--------\n";
    for (const editor of editors) {
        message += `${editor.name} (https://7tv.app/users/${editor.id}) / ${formatDate(
            new Date(editor.added_at)
        )} (${getDuration(new Date(editor.added_at))})\n`;
    }
    return message;
};
