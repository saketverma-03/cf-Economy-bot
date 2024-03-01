type ActionName = 'commandX' | 'commandY';
type Permission = Record<ActionName, string>;

/**Read onlt peroperty*/
export const actions: Permission = Object.freeze({
    commandX: '2',
    commandY: '4',
});

/**
 * @param permVal -> a bit int stringified version like "32" or "4"
 * @returns list of command string ['commanda', 'commandB']
 * */
export const expandCombinedActionVal = (actionVal: string): string[] => {
    const expandedActions = [];
    const bigIntPerm = BigInt(actionVal);
    for (const action in actions) {
        const tempActVal = BigInt(actions[action as ActionName]);
        if ((bigIntPerm & tempActVal) === tempActVal) {
            expandedActions.push(action);
        }
    }
    return expandedActions;
};

/** Generates a bignitValue by combining multiple permmisions*/
export const genCombinedActionVal = (names: ActionName[]): string => {
    let newPerm = BigInt('0');
    for (const item in names) {
        newPerm = newPerm | BigInt(actions[names[item]]);
    }
    return newPerm.toString();
};

export const isActPermitted = (curPerms: string, checkFor: string): boolean =>
    (BigInt(curPerms) & BigInt(checkFor)) === BigInt(checkFor);
