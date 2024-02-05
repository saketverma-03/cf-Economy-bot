import { REST, Routes } from 'discord.js';

import { config } from '@config/index';
import { commandManager } from '.';

const rest = new REST({ version: '10' }).setToken(config.env.BOT_TOKEN);

export const LoadCommands = async (guildID: string) => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(
                config.env.DISCORD_CLIENT_ID,
                guildID,
            ),
            {
                body: commandManager.getCommands(),
            },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};
