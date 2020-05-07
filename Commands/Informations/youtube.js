module.exports = {
    name: 'youtube',
    aliases: ['youtube'],
    description: "Obtenir le lien youtube EPCraft",
    category: "informations",
    usage: '',
    execute(message, args) {
        message.reply('https://links.epcraft.fr/youtube');
    }
}