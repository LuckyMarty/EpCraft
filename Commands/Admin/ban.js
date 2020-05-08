module.exports = {
    name: 'ban',
    aliases: ['ban'],
    description: "ban un utilisateur",
    category: "admin",
    cooldown: 5,
    usage: '<utilisateur> [raison]',
    permissions: true,
    isUserAdmin: true,
    
    execute(bot, message, args) {
        const user = message.mentions.users.first();
        const reason = (args.splice(1).join(" ") || 'Aucune raison spécifié');

        user ? message.guild.member(user).ban(reason) : message.channel.send("L'utilisateur n'existe pas !");
    }
}