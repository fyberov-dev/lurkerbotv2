export interface Channel {
    id: string;
    login: string;
}

export interface Chatters {
    count: number;
    broadcasters: string[];
    moderators: string[];
    vips: string[];
    staff: string[];
    viewers: string[];
    accuracy: number;
    ttl: number;
}

export interface Chat {
    channel: Channel;
    chatters: Chatters;
}

const getChatters = async (channel: string): Promise<Chat> => {
    const response: Response = await fetch(`https://api.markzynk.com/twitch/chatters/${channel}`);
    if (!response.ok) {
        throw new Error("Something bad happened");
    }
    const data: Chat = await response.json();
    return data;
};

export default { getChatters };
