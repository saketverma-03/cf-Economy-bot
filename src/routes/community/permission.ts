import { Elysia, t } from 'elysia';
import { isAuthenticated } from '@/middlewares/auth';
import { getComRolePerms } from '@/selector/community';
import { genCombinedActionVal } from '@/utils/permmissions';
import { updateCommunityPerms } from '@/services/community';

const route = new Elysia();

route.get('/', async ({ cookie }) => {
    const { guildId } = cookie;
    const data = await getComRolePerms(guildId.get());

    return {
        perms: data.perms,
        roles: data.roles.map((role) => ({
            id: role.id,
            name: role.name,
        })),
    };
});

route.put(
    '/',
    async ({ body, cookie }) => {
        const { guildId } = cookie;
        const map = new Map<string, string>();
        for (const item in body.perms) {
            // @ts-ignore
            const val = genCombinedActionVal(body.perms[item]);
            map.set(item, val);
        }
        // console.log(map);
        // TODO: create check the this user has permmissions to save this changes
        //  get userGuildByUserId and check if is adming of this group
        const a = await updateCommunityPerms(guildId.get(), map);
        console.log(a);

        return Response.json(
            {
                ok: 200,
            },
            { status: 200 },
        );
    },
    {
        type: 'application/json',
        body: t.Object({
            perms: t.Record(t.String(), t.Array(t.String())),
            roles: t.Array(
                t.Object({
                    id: t.String(),
                    name: t.String(),
                }),
            ),
        }),
    },
);

export const permRoutes = new Elysia().guard(
    {
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(route),
);

export default permRoutes;
