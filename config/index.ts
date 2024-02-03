const env = {
    NODE_ENV: process.env.NODE_ENV || '',
    MONGO_URI: process.env.MONGO_URI || '',
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || '',
    BOT_TOKEN: process.env.BOT_TOKEN || '',
    BASE_DISCORD_URL: 'https://discord.com/api/v10',
    OAUTH_URL: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&scope=identify+guilds+guilds.join`,
    PORT: process.env.PORT || 3210,
};

/**
 * @description  Checks if all env's are defined i.e have some true value
 *  NOTE: will through error if boolean false is set to some env,
 * */
function handleEnvCheck() {
    const envArray = Object.values(env);
    for (let i = 0; i < envArray.length; i++) {
        if (!envArray[i]) throw new Error(`missing env value at index ${i}`);
    }

    console.log('ENV Check Passed');
}
export const config = {
    env,
    healthCheck: handleEnvCheck,
};
