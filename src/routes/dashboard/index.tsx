import { isAuthenticated } from '@/middlewares/auth';
import cookieParser from '@/utils/cookieParser';
import Base from '@/views/components/Base';
import Dashboard from '@/views/pages/Dashboard';
import { Elysia } from 'elysia';

export const dashboardRoute = new Elysia().guard(
    {
        // @ts-ignore
        beforeHandle: isAuthenticated,
    },
    (app) =>
        app.get('/', (ctx) => {
            const { headers } = ctx;
            if (headers['HX-Boosted']) {
                return <Dashboard />;
            }
            return (
                <Base>
                    <Dashboard />
                </Base>
            );
        }),
);
