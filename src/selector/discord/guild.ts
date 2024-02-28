import { Role, GuilldMember, GuildDetails } from './types';

export async function getGuildDetails(botToken: string, guildId: string) {
    const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${botToken}`,
        },
    });
    if (!res.ok) return {};
    return res.json();
}

export async function getGuildRoles(
    botToken: string,
    guildId: string,
): Promise<Role[]> {
    const res = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}/roles`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        },
    );
    if (!res.ok) return [];
    return res.json() as Promise<Role[]>;
}

export async function getGuildMembers(botToken: string, guildId: string) {
    const res = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}/members`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        },
    );
    if (!res.ok) return undefined;
    return res.json() as Promise<GuildDetails>;
}

export async function getGuildMemberById(
    botToken: string,
    guildId: string,
    userId: string,
) {
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
    return res.json() as Promise<GuilldMember>;
}

// TODO: implement caching
export async function searchGuildMember(
    botToken: string,
    searchTerm: string,
    limit: number = 20,
    guildId: string,
) {
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
}
