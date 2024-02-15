import community from '@/db/models/community';
import { getComRolePerms } from '@/selector/community';
import { getGuildMemberById } from '@/selector/discord/guild';
import { actions, checkActoinVal } from '@/utils/permmissions';
import { config } from '@config/index';

export type CreateCommunityProps = {
    guildId: string; //guildId
    balance?: number;
    taxPerTransaction?: number;
    currencyName?: string;
    managerRoles?: string[];
};

export const createCommunity = (props: CreateCommunityProps) => {
    const newCommunity = new community({
        _id: props.guildId,
    });
    //save to db
    return newCommunity.save();
};

export const updateCommunityByGuildId = (
    guildId: string,
    updatedData: Omit<CreateCommunityProps, 'guildId'>,
) => {
    return community.findOneAndUpdate({ _id: guildId }, updatedData);
};

export const updateCommunityById = (
    id: string,
    updatedData: Omit<CreateCommunityProps, 'guildId'>,
) => updateCommunityByGuildId(id, updatedData);

export async function isPermmitedAction(
    guildId: string,
    userId: string,
    actionType: string,
) {
    const user = await getGuildMemberById(
        config.env.BOT_TOKEN,
        guildId,
        userId,
    );
    if (!user) {
        throw new Error('user not found in guild');
    }
    const roleIds = user.roles.map((role) => role.id);
    const rolePerms = await getComRolePerms(guildId);
    const actionVal = actions[actionType];

    for (const id of roleIds) {
        const temp = rolePerms.get(id);
        if (temp && checkActoinVal(actionVal, temp)) {
            return true;
        }
    }
    return false;
}
