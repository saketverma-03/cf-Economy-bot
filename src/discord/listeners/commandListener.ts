import { Interaction } from 'discord.js';
import { CommandManager } from '../commandManager';

export default async (
    interaction: Interaction,
    commandManager: CommandManager,
) => {
    if (!interaction.isChatInputCommand()) return;
    const command = commandManager.getCommand(interaction.commandName);
    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`,
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
};
