import { Client, Collection, Intents, MessageEmbed } from "discord.js";
import { TOKEN, DELETE_CHANNEL, ATTACHMENT_CHANNEL } from './config.js';


const client = new Client({ intents : new Intents(0x7fff) });
client.commands = new Collection();

/*Importing the commands*/
import spawnmonkey from './commands/spawnmonkey.js';
client.commands.set(spawnmonkey.name, spawnmonkey);
import uptime from './commands/uptime.js';
client.commands.set(uptime.name, uptime);
import ping from './commands/ping.js';
client.commands.set(ping.name, ping);

client.on('ready', () => {
    console.log('Logged in as '+ client.user.tag);
    client.user.setActivity('with my heels', {type: 'PLAYING'});
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    
   const cmd = client.commands.get(interaction.commandName);
   if (!cmd) return;

   try
   {
        await cmd.execute(interaction);
   }
   catch(error)
   {
        console.error(error);
        await interaction.reply( {content: "There was an error while executing this command!\nContact DawnOfSorrow#1977 if this issue persist.", ephemeral: true} );
   }
});

client.on('messageDelete', async (message) => {

    const delEmbed = new MessageEmbed()
        .setColor('AQUA')
        .setTitle(`${message.author.tag}(${message.author.id}) Deleted a message`)
        .setDescription(message.content + '\n' + message.attachments.first()?.url);

    await client.channels.cache.get(DELETE_CHANNEL).send( { embeds: [delEmbed] } )
});

client.on('typingStart', async (typing) => {
    
});

client.on('messageCreate', async (message) => {

    if (message.attachments.first()?.url)
    {
        const attachmentEmbed = new MessageEmbed()
        .setColor('DARK_GOLD')
        .setTitle(`${message.author.tag}(${message.author.id}) Sent an attachment`)
        .setDescription(message.attachments.first().url);

        await client.channels.cache.get(ATTACHMENT_CHANNEL).send( { embeds: [attachmentEmbed] } );
    }
    else if (message.content.includes('http'))
    {
        const attachmentEmbed = new MessageEmbed()
        .setColor('DARK_GOLD')
        .setTitle(`${message.author.tag}(${message.author.id}) Sent an attachment`)
        .setDescription(message.content);

        await client.channels.cache.get(ATTACHMENT_CHANNEL).send( { embeds: [attachmentEmbed] } );
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
});

client.login(TOKEN);