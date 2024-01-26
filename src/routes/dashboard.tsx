import { isAuthenticated, isGuildIdInCookie } from '@/middlewares/auth';
import Base from '@/views/components/Base';
import NavBar from '@/views/components/NavBar';
import Dashboard from '@/views/pages/Dashboard';
import { Elysia, t } from 'elysia';

const route = new Elysia();
route.get('/', (ctx) => {
    const { headers } = ctx;
    if (headers['hx-boosted']) {
        return (
            <>
                <NavBar />
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
        beforeHandle: (ctx) => {
            isGuildIdInCookie(ctx);
            isAuthenticated(ctx);
        },
    },
    (app) => app.use(route),
);
