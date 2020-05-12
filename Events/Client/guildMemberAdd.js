const Discord = require('discord.js');

module.exports = (Ecki, member) => {
    const welcome = member.guild.channels.cache.find((channel) => channel.id === "709786898213896253");
    if (!welcome) return;

    return welcome.send(`Bienvenue à ${member.user} sur EpCraft !`);
}