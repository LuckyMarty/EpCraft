const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const fs = require("fs");
const categoryList = fs.readdirSync('./Commands');
// console.log(categoryList);

module.exports = {
    name: 'help',
    aliases: ['help', 'aide', 'ecki', "Ecki", "EpCraft", "epcraft"],
    description: "Afficher toutes les commandes possible",
    category: "misc",
    agrs: false,
    usage: '<command_name>',

    execute(bot, message, args) {

        if(!args[0])
        {
            const embed = new Discord.MessageEmbed()
            .setTitle("Liste des commandes")
            .setDescription(`Une liste de toutes les sous-catégories disponibles et leurs commandes. \n Pour plus d'informations sur une commande, tapez \`${prefix}help <command_name>\``)

            for (const category of categoryList)
            {
                embed.addField(
                `${category}`,
                `${bot.commands.filter(cat => cat.category === category.toLowerCase()).map(cmd => cmd.name).join(' , ')}`
                )
            }

            embed.setFooter("Créé par WarTFlyeR");
            message.reply(embed);
        } 
        else {
            const command = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

            const embed = new Discord.MessageEmbed()
            .setTitle(`\`${command.name}\``)
            .addField("Description", `${command.description}`)
            .addField("Utilisation", command.usage ? `${prefix}${command.name} ${command.usage}` : `${prefix}${command.name}`, true)

            if (command.aliases.length >= 1)
            {
                embed.addField("Alias", `${command.aliases.join(', ')}`, true);
            }
            message.reply(embed);
        }
    } 
}
