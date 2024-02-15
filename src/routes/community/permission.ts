import { Elysia } from 'elysia';
import { isAuthenticated } from '@/middlewares/auth';

const route = new Elysia();

route.get('/', async ({ cookie }) => {
    const { guildId } = cookie;

    return {
        hellow: 'world',
        guildId: guildId.get(),
    };
});

export const permRoutes = new Elysia().guard(
    {
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(route),
);

export default permRoutes;
