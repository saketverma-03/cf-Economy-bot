import community from '@/db/models/community';

/*TODO:
 * - createCommunity
 * - updateCommunity
 * - getCommunity
 * */

export type CreateCommunityProps = {
    guildId: string; //guildId
    balance?: number;
    taxPerTransaction?: number;
    currencyName?: string;
    managerRoles?: string[];
};
export const createCommunity = (props: CreateCommunityProps) => {
    const tempData = { ...props, _id: '' };
    tempData._id = tempData.guildId;

    // TODO: chekc if this works
    tempData.guildId = '';

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

// TODO: update when making new permissions page;
export async function updateCommunityPerms(
    guidlId: string,
    newPerms: Map<string, string>,
) {
    return await community.findByIdAndUpdate(guidlId, {
        rolesPerms: newPerms,
    });
}

// export async function isPermmitedAction(guildId, userId, actionType) {
//   const user = await getGuildMemberById(
//       config.env.BOT_TOKEN,
//       guildId,
//       userId,
//   );
//   if (!user) {
//       throw new Error('user not found in guild');
//   }
//   const roleIds = user.roles.map((role) => role.id);
//   const rolePerms = await getComRolePerms(guildId);
//   for( id of roleIds){
//
// }
//
