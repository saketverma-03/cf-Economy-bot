import { isAuthenticated } from '@/middlewares/auth';
import Base from '@/views/components/Base';
import NavBar from '@/views/components/NavBar';
import BotSettings from '@/views/pages/botSettings';
import { Elysia } from 'elysia';

const onboard = new Elysia();

onboard.get('/', async (ctx) => {
    if (ctx.headers['hx-boosted']) {
        return <BotSettings />;
    }
    // get all users role
    // display all roles
    // give otios to add roles

    return (
        <Base>
            <NavBar />
            <BotSettings />
        </Base>
    );
});

export const botSettingsRoute = new Elysia().guard(
    {
        beforeHandle: (ctx) => isAuthenticated(ctx),
    },
    (app) => app.use(onboard),
);
