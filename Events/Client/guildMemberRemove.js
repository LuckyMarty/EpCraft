const Discord = require('discord.js');

module.exports = (Ecki, member) => {
    const inLog = member.guild.channels.cache.find((channel) => channel.id === "708624241053925396");
    if (!inLog) return;

    const embed_Quite_User = new Discord.MessageEmbed()
    .setColor("#dc143c")
    .setTitle(`__**${member.user.username}**__ nous a quité`)
    .setTimestamp();
    return inLog.send(embed_Quite_User);
}
