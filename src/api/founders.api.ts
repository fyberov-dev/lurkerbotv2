export interface Founder {
    isSubscribed: boolean;
    entitlementStart: string;
    id: string;
    login: string;
    displayName: string;
}

const getFounders = async (channel: string): Promise<Founder[]> => {
    const response: Response = await fetch(`https://api.ivr.fi/v2/twitch/founders/${channel}`);
    if (!response.ok) {
        if (response.status === 404) {
            return [];
        }
        throw new Error("Something bad happened");
    }
    const { founders }: { founders: Founder[] } = await response.json();
    return founders;
};

export default { getFounders };
