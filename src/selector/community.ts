import community from '@/db/models/community';

export const getAllCommunityIn = (guildIds: string[]) => {
    if (!guildIds.length) return [];
    return community.find({
        _id: {
            $in: guildIds,
        },
    });
};

export const getComRolePerms = async (
    guildId: string,
): Promise<Map<string, string>> => {
    const data = await community.findById(guildId);

    if (!data) throw new Error('Comminity Not found');
    if (!data.rolesPerms) {
        // returns empty map
        return new Map();
    }
    return data.rolesPerms;
};
