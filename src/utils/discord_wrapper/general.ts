// https://discord.com/developers/docs/reference#image-data
export const discordImage = {
    getGuildIcon: (guildId: string | number, guildIcon: string | number) =>
        `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.WebP `,

    getGuildBannerImage: (
        guildId: string | number,
        guildBannerImage: string | number,
    ) =>
        `https://cdn.discordapp.com/banners/${guildId}/${guildBannerImage}.WebP `,

    getUserAvatar: (userId: string | number, avatarId: string | number) =>
        `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.WebP `,

    getRoleIcon: (roleId: string | number, roleIcon: string | number) =>
        `https://cdn.discordapp.com/role-icons/${roleId}/${roleIcon}.WebP `,
};
