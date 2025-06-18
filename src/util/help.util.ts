import { readFile, readFileSync } from "fs";
import path from "path";
import pasteApi, { KeyResponse } from "../api/paste.api";

export let helpUrl: string = "";

export const generateHelpFile = async (): Promise<void> => {
    const file = readFileSync(path.resolve(__dirname, "../../public/help.txt"));
    console.log(String(file));
    const response: KeyResponse = await pasteApi.post(String(file));
    helpUrl = `https://paste.ivr.fi/raw/${response.key}`;
};
