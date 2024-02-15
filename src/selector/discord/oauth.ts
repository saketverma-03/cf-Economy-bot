import { AuthenticationError } from '@/middlewares/errorHandler/types';
import { config } from '@config/index';

export interface IRefreshedTokenRes {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
/**
 * @description generates a new accesstoken from refreshToken
 * {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response}
 * */
export const getAccessTokenFromRefreshToken = async (
    refreshToken: string,
): Promise<IRefreshedTokenRes | undefined> => {
    const res = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: config.env.DISCORD_CLIENT_ID,
            client_secret: config.env.DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: 'http://localhost:3000/redirect', // redirect URI is to be mentioned dynamically
            scope: 'identify',
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (!res.ok) {
        throw new AuthenticationError(
            'failed get new tokens form discord , Error in res',
        );
        return;
    }

    return res.json() as Promise<IRefreshedTokenRes>;
};
