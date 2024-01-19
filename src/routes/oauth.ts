import { Elysia, t } from "elysia";
import { config } from "@config/index";

export const OauthRoute = new Elysia().get(
	"/redirect",
	async ({ set, query, cookie: { access_token, refresh_token } }) => {
		const { code } = query;

		const tokenResponseData = await fetch(
			"https://discord.com/api/oauth2/token",
			{
				method: "POST",
				body: new URLSearchParams({
					client_id: config.env.DISCORD_CLIENT_ID,
					client_secret: config.env.DISCORD_CLIENT_SECRET,
					code,
					grant_type: "authorization_code",
					redirect_uri: "http://localhost:3000/redirect", // redirect URI is to be mentioned dynamically
					scope: "identify",
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const tokenResponse = await tokenResponseData.json();
		if (tokenResponse.error) {
			throw new Error("Error In Generating Auth token");
		}

		access_token.set({
			value: tokenResponse.access_token,
			expires: new Date(Date.now() + tokenResponse.expires_in * 1000),
		});

		refresh_token.set({
			value: tokenResponse.refresh_token,
		});

		set.redirect = "/dashboard";
	},
	{
		query: t.Object({
			code: t.String({ error: "FROM CODE DEF ERROR1" }),
		}),
	},
);
