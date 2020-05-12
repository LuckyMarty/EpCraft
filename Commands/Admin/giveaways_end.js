module.exports = {
    name: 'giveaways_end',
    aliases: ['ge'],
    description: "Terminer un Giveawys",
    category: "admin",
    cooldown: 5,
    usage: '<ID_message_giveaways>',
    permissions: true,
    isUserAdmin: true,
    
    execute(bot, message, args) {
        const ms = require('ms');
        require("discord-giveaways");

        // Si le membre n'a pas suffisamment d'autorisations
        if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour terminer les Giveaways.');
        }

        // Si aucun ID de message ou nom du giveaway n'est spécifié
        if(!args[0]){
            return message.channel.send(':x: Vous devez spécifier un ID de message valide !');
        }

        // essayer de trouver l'ID giveaway
        let giveaway = 
        // Chercher l'ID du prix
        bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        // Chercher l'ID du message du giveaway
        bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // Si pas de giveaway
        if(!giveaway){
            return message.channel.send('Impossible de trouver un Giveaway pour `'+ args.join(' ') + '`.');
        }

        // Modifier
        bot.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        .then(() => {
            message.channel.send('Le Giveaway se terminera dans moins de '+(bot.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
        })
        .then(() => {
            setTimeout(() => message.channel.send('Le Giveaway est bien terminé !'), bot.giveawaysManager.options.updateCountdownEvery);
        })
        .catch((e) => {
            if(e.startsWith(`Le Giveaway avec l'ID de message ${giveaway.messageID} n'est pas terminé.`)){
                message.channel.send('Ce giveaway n\est pas terminé !');
            } else {
                console.error(e);
                message.channel.send('Une erreur s\'est produite...');
            }
        });

    }
}
