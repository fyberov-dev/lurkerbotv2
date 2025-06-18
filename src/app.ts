import "dotenv/config";
import lurkerSocket from "./socket/lurker.socket";
import "./socket/bot.socket";
import { intervalLog } from "./util/log.util";
import { generateHelpFile } from "./util/help.util";
import http from "http";
import { addChat } from "./util/chat.util";

export const MAIN_CHANNEL = process.env.TWITCH_MAIN_CHANNEL;
export const OWNER = process.env.TWITCH_BOT_OWNER;
export let logCooldown = Number(process.env.TWITCH_LOG_COOLDOWN) ?? 150000;
export const DEFAULT_PREFIX = "O_O";
export const COMMAND_COOLDOWN = 3000;
export const channelsToJoinByDefault: string[] = String(process.env.TWITCH_JOIN_BY_DEFAULT).split(",") ?? [];

if (!MAIN_CHANNEL || !OWNER) {
    console.log("PROVIDE TWITCH_MAIN_CHANNEL IN .ENV FILE");
    process.exit(0);
}

lurkerSocket.addLurkerSocket();

intervalLog();
generateHelpFile();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Bot is up");
});

const PORT: number = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
