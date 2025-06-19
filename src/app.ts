import "dotenv/config";
import lurkerSocket from "./socket/lurker.socket";
import "./socket/bot.socket";
import { generateHelpFile } from "./util/help.util";
import http from "http";

export const MAIN_CHANNEL: string = String(process.env.TWITCH_MAIN_CHANNEL);
export const OWNER: string = String(process.env.TWITCH_BOT_OWNER);
export let logCooldown: number = Number(process.env.TWITCH_LOG_COOLDOWN) ?? 150000;
export const DEFAULT_PREFIX: string = process.env.TWITCH_COMMAND_PREFIX ?? "O_O";
export const COMMAND_COOLDOWN: number = 3000;
export const channelsToJoinByDefault: string[] = String(process.env.TWITCH_JOIN_BY_DEFAULT).split(",") ?? [];
export const START_TIME: Date = new Date();

if (!MAIN_CHANNEL || !OWNER) {
    console.log("PROVIDE TWITCH_MAIN_CHANNEL IN .ENV FILE");
    process.exit(0);
}

lurkerSocket.addLurkerSocket();

generateHelpFile();

const server = http.createServer((req, res): void => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Bot is up");
});

const PORT: number = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
