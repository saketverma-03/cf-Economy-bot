import { Elysia } from "elysia";
import { config } from "@config/index";


export const OauthRoute = new Elysia().get("/oauth", async ( { set, query,cookie:{ access_token, refresh_token} } ) => {

	const { code } = query;

	if (code) {
        console.log(code);
		try {
			const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: config.env.DISCORD_CLIENT_ID,
					client_secret: config.env.DISCORD_CLIENT_SECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: 'http://localhost:3000/oauth', // redirect URI is to be mentioned dynamically
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			
			const tokenResponse = await tokenResponseData.json();

			access_token.set({
				value: tokenResponse.access_token,
				expires: new Date(Date.now() + tokenResponse.expires_in*1000),
			})

			refresh_token.set({
				value: tokenResponse.refresh_token,
			})


       		set.redirect = "/dashboard";

		} catch (error) {
			// NOTE: An unauthorized token will not throw an error
			// tokenResponseData.statusCode will be 401
			console.error(error);
		}
	}
}
);