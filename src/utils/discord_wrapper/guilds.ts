/*TODO:
 *  update user
 * update Users Roles,
 * creat guild roles
 * modify guild role Position
 *
 * **/

export const getGuildDetails = async (botToken: string) => {
    const res = await fetch(
        'https://discord.com/api/v10/guilds/1170627136059609118',
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        },
    );
    if (!res.ok) return {};
    return res.json();
};

export const getGuildMembers = async (botToken: string) => {
    const res = await fetch('https://discord.com/api/v10/guilds/members', {
        method: 'GET',
        headers: {
            Authorization: `Bot ${botToken}`,
        },
    });
    if (!res.ok) return [];
    return res.json();
};

// TODO: decalre res type
export const getGuildMemberById = async (
    botToken: string,
    guildId: string,
    userId: string,
) => {
    const res = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        },
    );
    if (!res.ok) return;
    return res.json();
};

// TODO: implement caching
export const searchGuildMember = async (
    botToken: string,
    searchTerm: string,
    limit: number = 20,
    guildId: string,
) => {
    if (limit > 1000) {
        throw new Error('limit should be between 1-1000');
    }
    const res = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}/members/search?query=${searchTerm}&limit${limit}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        },
    );

    if (!res.ok) return [];
    return res.json();
};

export const addMultipleRoleToUser = async (
    botToken: string,
    guildId: string,
    userId: string,
    roles: string[] | number[],
) => {
    const res = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}/members`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        },
    );
    if (!res.ok) return;
    return res.json();
};
