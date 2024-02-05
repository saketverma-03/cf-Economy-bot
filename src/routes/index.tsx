import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import HomePage from '@/views/pages/HomePage';
import Base from '@/views/components/Base';
import { dashboardRoute } from './dashboard';
import authRoute from './auth';
import { errorHandler } from '@/middlewares/errorHandler';
import { errors } from '@/middlewares/errorHandler/types';
import { selectServerRoute } from './select-server';
import { onBoardRoute } from './onbard';
import { botSettingsRoute } from './bot-settings.jsx';

const app = new Elysia()
    // @ts-ignore
    .use(html())
    // @ts-ignore
    .use(staticPlugin())
    .error(errors)
    .onError(errorHandler)
    .get('/', async ({ cookie }) => {
        return (
            <Base>
                <HomePage
                    isAuthenticatd={cookie.refresh_token.get() ? true : false}
                />
            </Base>
        );
    })
    .group('/dashboard', (route) => route.use(dashboardRoute))
    .group('/select-server', (route) => route.use(selectServerRoute))
    .group('/onboard', (route) => route.use(onBoardRoute))
    .group('/bot-settings', (route) => route.use(botSettingsRoute))
    .group('/auth', (route) => route.use(authRoute));

export default app;
