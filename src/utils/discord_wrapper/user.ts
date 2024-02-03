export interface IUserDataResponse {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    verified: boolean;
    email: string;
    flags: number;
    banner: string | null;
    accent_color: number;
    premium_type: number;
    public_flags: number;
}

/**
 * @description fetch and returns user data from discord using accessToken
 * */
export const getUserData = async (
    accessToken: string,
): Promise<IUserDataResponse> => {
    const res = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        throw new Error(
            `Cat't get userData from discord code:  + ${res.status}`,
        );
    }
    return res.json() as PromiseLike<IUserDataResponse>;
};

export interface Guild {
    id: string;
    name: string;
    icon?: string; // only unique id
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: string[];
}

export const getUserGuilds = async (access_token: string): Promise<Guild[]> => {
    return await fetch('https://discord.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        redirect: 'follow',
    })
        .then((response) => response.json() as Promise<Guild[]>)
        .catch(() => []);
};

// https://discord.com/developers/docs/topics/permissions
export const isGuildAdmmin = (permissions: number): boolean =>
    (permissions & 0x0000000000000008) === 0x0000000000000008;
