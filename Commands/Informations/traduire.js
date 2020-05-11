module.exports = {
    name: 'traduire',
    aliases: ['traduire','!'],
    description: "Traduire un message",
    category: "informations",
    usage: '<langue> <message>',
    permissions: false,
    isUserAdmin: false,
    
    execute(bot, message, args) {
        const Discord = require('discord.js');
        const langs = require('../../langs.json');

        const key = "trnsl.1.1.20200509T202453Z.01bc12cf32cb6caa.56851e65f288b3085915a19cea17a458de8b9a89";
        var translate = require('yandex-translate')(key);

        console.log(langs.langs.Item.length);

        let lang = args[0];
        let txt = args.splice(1).join(" ");

        let Langues = "";
        let Codes = "";
        langs.langs.Item.forEach(x => {
            Langues += x._value + "\n";
            Codes += x._key + "\n";
        });

        if(!args.length)   
        {
            valid_languages = new Discord.MessageEmbed()
            .setTitle("Langues prises en charge")
            .addFields(
                {
                    name: "**Langue**",
                    value: Langues,
                    inline: true
                },
                {
                    name: "**Code**",
                    value: Codes,
                    inline: true
                }
            )
            message.author.send(valid_languages);
            message.reply("La liste des langues prises en charge vient d'être envoyé en message privé");
        } else {
            translate.translate(txt, { to: lang }, function(err, res) {
                console.log(res.text);
                if (res.text == undefined) return message.reply('Langue indisponible');
                return message.reply(res.text);
            });
        }
    }
}
