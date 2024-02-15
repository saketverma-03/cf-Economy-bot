type Permission = Record<string, string>;

/**Read onlt peroperty*/
export const actions: Permission = Object.freeze({
    commandX: '2',
    commandY: '4',
});

export const actionsNames = {
    commandX: 'commandX',
    commandY: 'commandY',
};

/**
 * @param permVal -> a bit int stringified version like "32" or "4"
 * @returns list of command string ['commanda', 'commandB']
 * */
export const expandCombinedActionVal = (actionVal: string): string[] => {
    const expandedActions = [];
    const bigIntPerm = BigInt(actionVal);
    for (const action in actions) {
        const tempActVal = BigInt(actions[action]);
        if ((bigIntPerm & tempActVal) === tempActVal) {
            // TODO: should push name of the command
            expandedActions.push(action);
        }
    }
    return expandedActions;
};

/** Generates a bignitValue by combining multiple permmisions*/
export const genCombinedActionVal = (names: string[]): string => {
    let newPerm = BigInt('0');
    for (const item in names) {
        newPerm = newPerm | BigInt(actions[names[item]]);
    }
    return newPerm.toString();
};

export const checkActoinVal = (actionVal: string, test: string): boolean =>
    (BigInt(actionVal) & BigInt(test)) === BigInt(test);
