import { Client, GatewayIntentBits } from 'discord.js';
import { CommandManager } from './commandManager';
import commandListener from './listeners/commandListener';
import { config } from '@config/index';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const commandManager = new CommandManager();

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});


client.on('interactionCreate', async interaction => {
  commandListener(interaction, commandManager); 
});

export const logintoBot = async () => client.login(config.env.BOT_TOKEN);
export default client;

