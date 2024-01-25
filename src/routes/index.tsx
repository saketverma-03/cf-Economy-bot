import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import HomePage from '@/views/pages/HomePage';
import Base from '@/views/components/Base';
import { dashboardRoute } from './dashboard';
import { OauthRoute } from './oauth';
import { errorHandler } from '@/middlewares/errorHandler';
import { errors } from '@/middlewares/errorHandler/types';
import { selectServerRoute } from './select-server';

const app = new Elysia()
    .use(html())
    .use(staticPlugin())
    .error(errors)
    .onError(errorHandler)
    .get('/', async () => {
        return (
            <Base>
                <HomePage />
            </Base>
        );
    })
    .group('/dashboard', (route) => route.use(dashboardRoute))
    .group('/select-server', (route) => route.use(selectServerRoute))
    .use(OauthRoute);

export default app;
