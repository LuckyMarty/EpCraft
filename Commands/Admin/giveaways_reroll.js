module.exports = {
    name: 'giveaways_reroll',
    aliases: ['gr'],
    description: "Relancer un Giveawys",
    category: "admin",
    cooldown: 5,
    usage: '<ID_message_giveaways>',
    permissions: true,
    isUserAdmin: true,
    
    execute(bot, message, args) {
        const ms = require('ms');

        // Si le membre n'a pas suffisamment d'autorisations
        if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour relancer les Giveaways.');
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

        if(!giveaway){
            return message.channel.send('Impossible de trouver un Giveaway pour `'+ args.join(' ') +'`.');
        }

        // Relancer le giveaway
        bot.giveawaysManager.reroll(giveaway.messageID, {
            messages: {
                congrat: ":tada: Nouveau(x) gagnant(e•s) : {winners}! Congratulations!",
                error: "No valid participations, no winners can be chosen!"
            }
        })
        .then(() => {
            message.channel.send('Giveaway relancé !');
        })
        .catch((e) => {
            if(e.startsWith(`Le Giveaway avec l'ID message ${giveaway.messageID} n'est pas terminé.`)){
                message.channel.send('Ce giveaway n\est pas terminé !');
            } else {
                console.error(e);
                message.channel.send('Une erreur s\'est produite...');
            }
        });
    }
}
