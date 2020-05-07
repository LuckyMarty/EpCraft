module.exports = {
    name: 'ip',
    aliases: ['ip'],
    description: "Adresse IP du serveur EPCraft",
    category: "informations",
    usage: '',
    execute(message, args) {
        const Discord = require('discord.js');
        const ping = require('minecraft-server-util');
        const config = require('../../config.json');
        
        ping(config.ip, 25565, (error, response) => {
            let version = String(response.version);
            version = version.replace(/[A-Za-z]/g,"");
            message.reply( response.host + ' (en' + version + ')');
        });
    }
}