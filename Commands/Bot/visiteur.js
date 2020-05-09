module.exports = {
    name: 'visiteur',
    aliases: ['visiteur'],
    description: "Attribuer à tous les utilisateurs n'ayant pas de bagde, le badge visiteur",
    category: "bot",
    cooldown: 5,
    usage: '',
    permissions: true,
    isUserAdmin: false,
    
    execute(bot, message, args) {
        if (message)
        {
            function Attribution_Visiteur() 
            {
                let role = message.guild.roles.cache.find(r => r.id == '430051447254810625');
                if (!role) return message.channel.send(`**${message.author.username}**, role not found`);
            
                message.guild.members.cache.filter(member => member.roles.cache.array().length <= 1).forEach(member => member.roles.add(role));
                // console.log("visiteur");
            }
            setInterval(Attribution_Visiteur, 1000);
        }
    }
}
