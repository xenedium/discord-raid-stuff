import discord from 'discord.js-selfbot'
//import discord from 'discord.js'
import fs from 'fs/promises'

const client = new discord.Client( { intents: new discord.Intents(0x7fff) } );

var hooks = [];

client.on('ready', async () => {
    console.log("Self bot online, creating webhooks as: " + client.user.tag);
    const channels = client.guilds.cache.get('753158627531161680').channels.cache;
    channels.forEach( async (channel) => {
        if (channel.type == 'text')
        {
            let hook1 = await channel.createWebhook('webhook');
            let hook2 = await channel.createWebhook('webhook1');
            let hook3 = await channel.createWebhook('webhook2');
            await fs.appendFile(`${process.cwd()}/hooks.txt`, `${hook1.url}\n`);
            await fs.appendFile(`${process.cwd()}/hooks.txt`, `${hook2.url}\n`);
            await fs.appendFile(`${process.cwd()}/hooks.txt`, `${hook3.url}\n`);
            console.log(hook1.url);
            console.log(hook2.url);
            console.log(hook3.url);
        }
    });
});


client.login('TOKEN');