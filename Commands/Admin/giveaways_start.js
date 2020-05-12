module.exports = {
    name: 'giveaways_start',
    aliases: ['gs'],
    description: "Créer un Giveaways",
    category: "admin",
    cooldown: 5,
    usage: '<durée> <nombre_de_gagnant> <nom_du_giveaways>]',
    permissions: true,
    isUserAdmin: true,
    
    execute(bot, message, args) {
        const ms = require('ms');

        // Controle de permission
        if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour démarrer les Giveaways.');
        }

        // Choix du channel
        let giveawayChannel = message.mentions.channels.first();
        if(!giveawayChannel){
            return message.channel.send(':x: Vous devez mentionner un channel valide!');
        }

        // Durée du Giveaway
        let giveawayDuration = args[1];
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return message.channel.send(':x: Vous devez spécifier une durée valide !');
        }

        // Nombre de gagants
        let giveawayNumberWinners = args[2];
        if(isNaN(giveawayNumberWinners)){
            return message.channel.send(':x: Vous devez spécifier un nombre valide de gagnants !');
        }

        // Prix Giveaway
        let giveawayPrize = args.slice(3).join(' ');
        if(!giveawayPrize){
            return message.channel.send(':x: Vous devez spécifier un prix valide !');
        }

        // Commencer le Giveaway
        bot.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayNumberWinners,
            hostedBy: message.author,
            messages: {
                giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "🎉🎉 **GIVEAWAY TERMINÉ** 🎉🎉",
                timeRemaining: "Temps restant : **{duration}** !",
                inviteToParticipate: "Réagissez avec 🎉 pour participer !",
                winMessage: "Toutes nos félicitations, {winners} ! Tu as gagné **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway annulé, aucune participation valide.",
                hostedBy: "Auteur : {user}",
                winners: "Gagnant(e•s)",
                endedAt: "Termine",
                units: {
                    seconds: "secondes",
                    minutes: "minutes",
                    hours: "heures",
                    days: "jours",
                    pluralS: false
                }
            }
        });

        message.channel.send(`Le Giveaways a été lancé dans ${giveawayChannel}!`);

    }
}
