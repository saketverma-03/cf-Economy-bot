import community from '@/db/models/community';
import { expandCombinedActionVal } from '@/utils/permmissions';
import { config } from '@config/index';
import { getGuildRoles } from './discord/guild';

export const getAllCommunityIn = (guildIds: string[]) => {
    if (!guildIds.length) return [];
    return community.find({
        _id: {
            $in: guildIds,
        },
    });
};

export const getComRolePerms = async (guildId: string) => {
    const [data, guildRoles] = await Promise.all([
        community.findById(guildId),
        getGuildRoles(config.env.BOT_TOKEN, guildId),
    ]);
    if (!data) throw new Error('Comminity Not found');
    let perms;

    if (!data.rolesPerms) {
        //  empty map
        perms = new Map<string, string>();
    } else {
        perms = data.rolesPerms;
    }
    const resRolePerms = new Map<string, string[]>();
    for (const role of guildRoles) {
        const rolePermsComVal = perms.get(role.id);
        if (!rolePermsComVal) {
            resRolePerms.set(role.id, []);
            continue;
        }
        const rolePermNames = expandCombinedActionVal(rolePermsComVal);
        resRolePerms.set(role.id, rolePermNames);
    }

    return {
        perms: Object.fromEntries(resRolePerms),
        roles: guildRoles,
    };
};
