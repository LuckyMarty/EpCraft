module.exports = {
    name: 'site',
    aliases: ['site'],
    description: "Obtenir le lien du site EPCraft",
    category: "informations",
    usage: '',
    execute(message, args) {
        message.reply('https://www.epcraft.fr/');
    }
}