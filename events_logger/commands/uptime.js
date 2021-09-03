async function execute(interaction)
{
    await interaction.reply( { content: interaction.client.uptime.toString() + ' ms'} );
}

export default {name: "uptime", execute};