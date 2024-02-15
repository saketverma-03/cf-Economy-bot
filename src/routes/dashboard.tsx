import { getAllCommunityIn } from '@/selector/community';
import { isAuthenticated } from '@/middlewares/auth';
import { getUserGuilds } from '@/selector/discord/user';
import Base from '@/views/components/Base';
import NavBar from '@/views/components/NavBar';
import { SelectServerCard } from '@/views/components/selectServerCard';
import Dashboard from '@/views/pages/Dashboard';
import { Elysia, t } from 'elysia';

const route = new Elysia();
// TODO: make proper route
route.get('/ping', async ({ cookie, set }) => {
    const { access_token } = cookie;

    set.headers['Cache-Control'] = 'private, max-age=5 ,stale-while-revalidate';
    const userGuilds = await getUserGuilds(access_token.get());
    const community = await getAllCommunityIn(
        userGuilds.map((guild) => guild.id),
    );
    const gWithBot = [];

    // NOTE: scope for improvment
    for (const i in userGuilds) {
        for (const j in community) {
            if (gWithBot.length === community.length) break;
            if (community[j]._id === userGuilds[i].id) {
                gWithBot.push(userGuilds[i]);
                break;
            }
        }
    }

    return (
        <>
            {gWithBot.map((guild) => (
                <SelectServerCard guild={guild} />
            ))}
        </>
    );
});
route.get('/', (ctx) => {
    const { headers } = ctx;
    if (headers['hx-boosted']) {
        return (
            <>
                <Dashboard />
            </>
        );
    }
    return (
        <Base>
            <NavBar />
            <Dashboard />
        </Base>
    );
});

route.get(
    '/redirect',
    ({ query, cookie, set }) => {
        cookie.guildId.set({
            value: query.id,
            path: '/',
        });

        set.redirect = '/dashboard';
    },
    {
        query: t.Object({
            id: t.String(),
        }),
    },
);

export const dashboardRoute = new Elysia().guard(
    {
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(route),
);
