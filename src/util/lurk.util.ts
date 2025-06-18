import { FollowedChannel } from "../api/follows.api";
import { MAIN_CHANNEL } from "../app";
import { botSocket } from "../socket/bot.socket";
import { joinChannels } from "./join.util";

export const lurking: string[] = [];
export let isLurkingActive: boolean = false;

export const lurk = async (user: string, followedChannels: FollowedChannel[]) => {
    botSocket.send(
        `PRIVMSG #${MAIN_CHANNEL} :started lurking ${user} in ${followedChannels.length} channels`
    );
    const channelsArray: string[] = followedChannels.map((v) => v.login);
    lurking.push(user.toLowerCase());
    joinChannels(channelsArray);
    makeLurkingActive();
};

export const makeLurkingActive = () => {
    isLurkingActive = true;
};
