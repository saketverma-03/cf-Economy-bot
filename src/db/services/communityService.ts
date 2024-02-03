import community, { Community } from '../models/community';

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

export const getAllCommunityIn = (guildIds: string[]) => {
    if (!guildIds.length) return [];
    return community.find({
        _id: {
            $in: guildIds,
        },
    });
};

// UPDATE

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
