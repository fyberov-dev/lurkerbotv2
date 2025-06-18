import addLurkerCommand from "../command/add.lurker.command";
import addMentionCommand from "../command/add.mention.command";
import checkLurkingCommand from "../command/check.lurking.command";
import checkMentionCommand from "../command/check.mention.command";
import deadSocketCommand from "../command/dead.socket.command";
import deleteMentionCommand from "../command/delete.mention.command";
import followsCommand from "../command/follows.command";
import getModsCommand from "../command/get.mods.command";
import getVipsCommand from "../command/get.vips.command";
import helpCommand from "../command/help.command";
import isJoinedCommand from "../command/is.joined.command";
import isModCommand from "../command/is.mod.command";
import isVipCommand from "../command/is.vip.command";
import joinCommand from "../command/join.command";
import lurkChannelCommand from "../command/lurk.channel.command";
import lurkCommand from "../command/lurk.command";
import massJoinCommand from "../command/mass.join.command";
import permitCommand from "../command/permit.command";
import resetMentionCommand from "../command/reset.mention.command";
import unlurkCommand from "../command/unlurk.command";
import watchUserCommand from "../command/watch.user.command";
import { CommandData, parseCommand } from "../util/command.util";
import followageCommand from "../command/followage.command";
import userCommand from "../command/user.command";
import founderCommand from "../command/founder.command";
import clearUserMentionCommand from "../command/clear.user.mention.command";
import killCommand from "../command/kill.command";
import { COMMAND_COOLDOWN } from "../app";
import pingCommand from "../command/ping.command";
import logsCommand from "../command/logs.command";

let canBeExecutedAfter: Date = new Date();

export const onCommand = (data: string): void => {
    const commandData: CommandData | null = parseCommand(data);
    if (!commandData) {
        return;
    }
    const currentTime = new Date();
    if (currentTime < canBeExecutedAfter) return;
    switch (commandData.command) {
        case "ping":
            pingCommand.execute();
            break;
        case "h":
        case "help":
            helpCommand.execute();
            break;
        case "al":
        case "add_lurker":
            addLurkerCommand.execute(commandData.username, +commandData.properties[0]);
            break;
        case "j":
        case "join":
            joinCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "mj":
        case "mass_join":
            massJoinCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "l":
        case "lurk":
            lurkCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "unl":
        case "unlurk":
            unlurkCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "isj":
        case "is_joined":
            isJoinedCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "w":
        case "watch":
            watchUserCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "ds":
        case "dead_socket":
            deadSocketCommand.execute(commandData.username);
            break;
        case "lc":
        case "lurk_channel":
            lurkChannelCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "permit":
            permitCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "addm":
        case "add_mention":
            addMentionCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "delm":
        case "delete_mention":
            deleteMentionCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "chkm":
        case "check_mention":
            checkMentionCommand.execute(commandData.username);
            break;
        case "resm":
        case "reset_mention":
            resetMentionCommand.execute(commandData.username);
            break;
        case "wl":
        case "watch_lurking":
            checkLurkingCommand.execute(commandData.username);
            break;
        case "f":
        case "follows":
            followsCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "mod":
        case "is_mod":
            isModCommand.execute(commandData.username, commandData.properties[0], commandData.properties[1]);
            break;
        case "vip":
        case "is_vip":
            isVipCommand.execute(commandData.username, commandData.properties[0], commandData.properties[1]);
            break;
        case "mods":
        case "get_mods":
            getModsCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "vips":
        case "get_vips":
            getVipsCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "fa":
        case "followage":
            followageCommand.execute(
                commandData.username,
                commandData.properties[0],
                commandData.properties[1]
            );
            break;
        case "u":
        case "user":
            userCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "fou":
        case "founders":
            founderCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "cm":
        case "clear_mention":
            clearUserMentionCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "logs":
            logsCommand.execute(commandData.username, commandData.properties[0]);
            break;
        case "kill":
            killCommand.execute(commandData.username);
            break;
    }
    canBeExecutedAfter = new Date(currentTime.getTime() + COMMAND_COOLDOWN);
};
