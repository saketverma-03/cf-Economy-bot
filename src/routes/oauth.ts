import { Elysia } from "elysia";
import { config } from "@config/index";


export const OauthRoute = new Elysia().get("/oauth", async (ctx) => {

	const { code } = ctx.query;

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
					redirect_uri: 'http://localhost:3000/oauth                                                                                                                                                                                                                                                  ', // redirect URI is to be mentioned dynamically
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}).then((res) => res.json())
            .then((oauthData) => {
                console.log(oauthData);
                return oauthData;
            }
        );
        
        return tokenResponseData;

		} catch (error) {
			// NOTE: An unauthorized token will not throw an error
			// tokenResponseData.statusCode will be 401
			console.error(error);
		}
	}
}
);