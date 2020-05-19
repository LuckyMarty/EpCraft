const Discord = require('discord.js');
const Ecki = new Discord.Client();
const PREFIX = process.env.PREFIX;

module.exports = (Ecki, message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    if (message.content == PREFIX+"start_bot")
    {
        Ecki.commands.get('visiteur').execute("", message, "");
//         Ecki.commands.get('ride_status').execute(Ecki, message, "");
    }

    let args = message.content.slice(PREFIX.length).split(/ +/);
    let cmd = args.shift().toLowerCase();
    
    let commandfile = Ecki.commands.get(cmd) || Ecki.commands.find(alias => alias.aliases.includes(cmd));
    if (!commandfile) return;


    if (commandfile.permissions && !message.member.hasPermission('ADMINISTRATOR')) return message.reply("Tu n'as pas de permission pour cette commande !");
   
    // Ajouter des informations sur le Handler
    if (commandfile.args && !args.length)
    {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author} !`;
        if (commandfile.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${PREFIX}${commandfile.name} ${commandfile.usage}\``;
        return message.channel.send(noArgsReply);
    }
    
    commandfile.execute(Ecki, message, args);
}
