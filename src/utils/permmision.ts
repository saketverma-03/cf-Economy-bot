type Permissions = Record<string, string>;

export const permissions: Permissions = {
    administrator: BigInt(1 << 2).toString(),
};
