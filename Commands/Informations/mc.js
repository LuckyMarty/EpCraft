module.exports = {
    name: 'mc',
    aliases: ['mc'],
    description: "Informations sur le serveur EPCraft",
    category: "informations",
    usage: '',
    execute(bot, message, args) {
        const Discord = require('discord.js');
        const ping = require('minecraft-server-util');
        
        ping(process.env.IP, 25565, (error, response) => {
            if (error) throw error;

            let Embed = new Discord.MessageEmbed()
            .setTitle('Server Status')
            .addField('Server IP', response.host)
            .addField('Server Version', response.version)
            .addField('Server Player', response.onlinePlayers)
            .addField('Max Player', response.maxPlayers);

            message.reply(Embed);

            // console.log(response);
        });
    }
}
