module.exports = {
    name: 'facebook',
    aliases: ['facebook'],
    description: "Obtenir le lien Facebook EPCraft",
    category: "informations",
    usage: '',
    execute(message, args) {
        message.reply('https://links.epcraft.fr/facebook');
    }
}