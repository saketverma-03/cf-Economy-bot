// https://discord.com/developers/docs/reference#image-data
export const discordImage = {
    getGuildIcon: (guildId: string | number, guildIcon: string | number) =>
        `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.webp `,

    getGuildBannerImage: (
        guildId: string | number,
        guildBannerImage: string | number,
    ) =>
        `https://cdn.discordapp.com/banners/${guildId}/${guildBannerImage}.webp `,

    getUserAvatar: (userId: string | number, avatarId: string | number) =>
        `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp `,

    getRoleIcon: (roleId: string | number, roleIcon: string | number) =>
        `https://cdn.discordapp.com/role-icons/${roleId}/${roleIcon}.webp `,
};

export const generateBotInviteLink = (clinetId: string, guildId: string) => {
    return `https://discord.com/api/oauth2/authorize?client_id=${clinetId}&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3210%2Fonboard&scope=applications.commands+bot+identify&guild_id=${guildId}&disable_guild_select=true`;
};
