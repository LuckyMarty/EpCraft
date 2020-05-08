module.exports = {
    name: 'ip',
    aliases: ['ip', 'IP', 'Ip'],
    description: "Adresse IP du serveur EPCraft",
    category: "informations",
    usage: '',
    permissions: false,
    isUserAdmin: false,
    
    execute(bot, message, args) {
        const Discord = require('discord.js');
        const ping = require('minecraft-server-util');
        
        ping(process.env.IP, 25565, (error, response) => {
            let version = String(response.version);
            version = version.replace(/[A-Za-z]/g,"");
            message.reply( response.host + ' (en' + version + ')');
        });
    }
}
