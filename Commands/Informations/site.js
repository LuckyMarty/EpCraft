module.exports = {
    name: 'site',
    aliases: ['site', 'web'],
    description: "Obtenir le lien du site EPCraft",
    category: "informations",
    usage: '',
    execute(bot, message, args) {
        const Discord = require('discord.js');

        let Embed = new Discord.MessageEmbed()
        .setTitle("EpCraft - Site")
        .setDescription("https://www.epcraft.fr/")
        .setThumbnail('https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/45546880_2191011877589727_1205185763335995392_n.png?_nc_cat=110&_nc_sid=85a577&_nc_ohc=Sjw4dZbEM18AX_RcU3O&_nc_ht=scontent.fcdg1-1.fna&oh=dd23e97f84b5302e02de32ba0a568405&oe=5ED92A47');
        message.reply(Embed);
        // message.reply('https://www.epcraft.fr/');
    }
}
