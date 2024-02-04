import { Elysia, t } from 'elysia';
import { config } from '@config/index';

const route = new Elysia();

route.get('/', ({ set, headers }) => {
    return (set.headers['HX-Redirect'] = config.env.OAUTH_URL);
});

// dicord oAutg redirect url
route.get(
    '/redirect',
    async ({ set, query, cookie }) => {
        const { code } = query;

        // fetch request
        const body = new URLSearchParams({
            client_id: config.env.DISCORD_CLIENT_ID,
            client_secret: config.env.DISCORD_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3210/auth/redirect', // redirect URI is to be mentioned dynamically
            scope: 'identify email guilds guilds.members.read guilds.join',
        }).toString();

        const res = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!res.ok) {
            throw new Error('failed to autorize');
        }
        const tokenResponse = await res.json();

        // setting cookies
        cookie.access_token.set({
            value: tokenResponse.access_token,
            expires: new Date(Date.now() + tokenResponse.expires_in * 1000),
            path: '/',
        });

        cookie.refresh_token.set({
            value: tokenResponse.refresh_token,
            path: '/',
        });
        console.log(tokenResponse);

        set.redirect = '/select-server';
    },
    {
        query: t.Object({
            code: t.String(),
        }),
    },
);

route.delete('/', (ctx) => {
    const { cookie, set } = ctx;
    cookie.access_token.remove({ path: '/' });
    cookie.refresh_token.remove({ path: '/' });
    cookie.guildId.remove({ path: '/dashboard' });
    return (set.redirect = '/');
});

// logoute route

export default route;
