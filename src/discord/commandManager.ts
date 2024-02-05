import { Collection } from 'discord.js';
import { readdirSync } from 'fs';

export class CommandManager {
    private commands: Collection<string, any> = new Collection();

    private importCommand(filePath: string) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { default: command } = require(filePath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
                );
            }
        } catch (error) {
            console.error(`Error importing ${filePath}: ${error}`);
        }
    }

    private loadCommands() {
        const commandFiles = readdirSync('./src/discord/commands'); // doubt here in handling path
        for (const file of commandFiles) {
            this.importCommand(`./commands/${file}`);
        }
    }

    getCommands() {
        const commandsData = new Collection<string, any>();
        this.commands.forEach((command) => {
            commandsData.set(command.data.name, command.data.toJSON());
        });
        return commandsData;
    }

    getCommand(name: string) {
        return this.commands.get(name);
    }

    constructor() {
        this.loadCommands();
    }
}
