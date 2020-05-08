module.exports = {
    name: 'ban',
    aliases: ['ban'],
    description: "ban un utilisateur",
    category: "admin",
    cooldown: 5,
    usage: '<utilisateur> [<raison> optionnel]',
    permissions: true,
    isUserAdmin: true,
    
    execute(bot, message, args) {
        const user = message.mentions.users.first();
        const reason = (args.splice(1).join(" ") || 'Aucune raison spécifié');

        user ? message.guild.member(user).ban(reason) : message.channel.send("L'utilisateur n'existe pas !");
        
        const embed = new MessageEmbed()
        .setAuthor(`${user.username} ${user.id}`)
        .setColor("#dc143c")
        .setDescription(`**Action** : ban\n **Raison** : ${reason}`)
        .setThumbnail(user.avatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

        bot.channels.cache.get('708314429821026356').send(embed);
    }
}
