import { DEFAULT_PREFIX } from "../app";

export const checkIfActive = (data: string): boolean => {
    return data.includes(":tmi.twitch.tv CAP * ACK");
};

export const checkIfPing = (data: string): boolean => {
    return data.includes("PING :tmi.twitch.tv");
};

export const MESSAGE_REGEX: RegExp =
    /:[A-Za-z0-9_]+![A-Za-z0-9_]+@(?<username>[A-Za-z0-9_]+)\.tmi\.twitch\.tv PRIVMSG #(?<channel>[A-Za-z0-9_]+) :(?<msg>.*)/u;

export const checkIfMessage = (data: string): boolean => {
    return MESSAGE_REGEX.test(data);
};

export const checkIfCommand = (data: string): boolean => {
    return data.startsWith(DEFAULT_PREFIX);
};
