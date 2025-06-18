export interface KeyResponse {
    key: string;
}

const post = async (message: string): Promise<KeyResponse> => {
    const response: Response = await fetch("https://paste.ivr.fi/documents", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: message,
    });
    if (!response.ok) {
        throw new Error("Something went bad");
    }
    const data: KeyResponse = await response.json();
    return data;
};

export default {
    post,
};
