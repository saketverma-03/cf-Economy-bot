import { Context } from 'elysia';
import { AuthenticationError } from './errorHandler/types';
import { IUserDataResponse } from '@/utils/discord_wrapper/user';
import { getAccessTokenFromRefreshToken } from '@/utils/discord_wrapper/oauth';

export interface ContextBeforeHandle extends Omit<Context, 'params'> {
    params: Record<never, string>;
}
export const isAuthenticated = async (ctx: ContextBeforeHandle) => {
    const { cookie, set, headers, request } = ctx;
    const { refresh_token, access_token } = cookie;
    //@ts-ignore
    const reqPath = `${request.url?.split(headers.host)[1]}`;

    if (!refresh_token.get()) {
        throw new AuthenticationError('AuthenticationError from middleware1');
    }

    if (!access_token.get()) {
        const tokenData = await getAccessTokenFromRefreshToken(
            refresh_token.get(),
        );
        console.log(tokenData);
        if (!tokenData) throw new AuthenticationError('Cant get refresh token');
        ctx.cookie.access_token.set({
            value: tokenData.access_token,
            expires: new Date(Date.now() + tokenData.expires_in * 1000),
            path: '/',
        });
        ctx.cookie.refresh_token.set({
            value: tokenData.refresh_token,
            path: '/',
        });
        return (set.redirect = reqPath);
    }
};

export type user = Omit<
    IUserDataResponse,
    | 'public_flags'
    | 'flags'
    | 'accent_color'
    | 'premium_type'
    | 'verified'
    | 'discriminator'
>;

export function isGuildIdInCookie(ctx: ContextBeforeHandle) {
    const { cookie } = ctx;
    if (!cookie.guildId.get()) return (ctx.set.redirect = '/select-server');
}
