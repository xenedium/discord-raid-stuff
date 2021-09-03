import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { TOKEN, CLIENT_ID, GUILD_ID } from './config.js';
import { SlashCommandBuilder } from '@discordjs/builders';



const commands = 
[
    new SlashCommandBuilder()
        .setName('spawnmonkey')
        .setDescription('🙉Spawn and send a photo of a monke out in the wild!🙊'),

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the bot\'s average response time ⏳'),
    
    new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('⏱Get the bot\'s uptime⏱')

].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

(
    async () => 
    {
        try 
        {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),{ body: commands },);

            console.log('Successfully refreshed application (/) commands.');
        }
        catch (error)
        {
            console.error( error);
        }
    }
)();