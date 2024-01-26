import { Context } from 'elysia';
import { AuthenticationError } from './errorHandler/types';
import { IUserDataResponse } from '@/utils/discord_wrapper/user';
import { getAccessTokenFromRefreshToken } from '@/utils/discord_wrapper/oauth';
import cookieParser from '@/utils/cookieParser';

export interface ContextBeforeHandle extends Omit<Context, 'params'> {
    params: Record<never, string>;
}
export const isAuthenticated = async (ctx: ContextBeforeHandle) => {
    if (!ctx.headers.cookie) {
        return (ctx.set.status = 'Unauthorized');
    }
    const { refresh_token, access_token } = cookieParser(ctx.headers.cookie);

    if (!refresh_token) {
        throw new AuthenticationError('AuthenticationError from middleware1');
    }

    if (!access_token) {
        const tokenData = await getAccessTokenFromRefreshToken(refresh_token);
        if (!tokenData) throw new AuthenticationError('Cant get refresh token');
        console.log({ tokenData });
        ctx.cookie.access_token.set({
            value: tokenData.access_token,
            expires: new Date(Date.now() + tokenData.expires_in * 1000),
        });
        ctx.cookie.refresh_token.set({
            value: tokenData.refresh_token,
        });
        return (ctx.set.redirect = '/dashboard');
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
    const { cookie } = ctx.headers;
    if (!cookie) return (ctx.set.redirect = '/');

    const cookies = cookieParser(cookie);

    if (!cookies.guildid) return (ctx.set.redirect = '/select-server');
}
