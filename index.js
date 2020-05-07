const Discord = require('discord.js');
const Ecki = new Discord.Client();
const ping = require('minecraft-server-util');
const fs = require('fs');

Ecki.login(process.env.TOKEN);
const PREFIX = process.env.PREFIX;


// CHERCHER LA COMMANDE ET ALIAS
// const fs = require('fs');
Ecki.commands = new Discord.Collection();
Ecki.aliases = new Discord.Collection();
const category = fs.readdirSync('./Commands');

for (let j=0 ; j<category.length ; j++)
{
    fs.readdir("./Commands/"+category[j], (err, files) => {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js");
        
        if (jsfile.length <= 0)
        {
            return console.log("[LOGS] Impossible de trouver la commande !");
        }

        jsfile.forEach((f, i) => {
            let pull = require(`./Commands/${category[j]}/${f}`);
            Ecki.commands.set(pull.name, pull);      //Chercher la commande
            pull.aliases.forEach(alias => {
                Ecki.aliases.set(alias, pull.name);  //Chercher l'alias de la commande
            });
        });
    });
}

Ecki.on("message", message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray[1];

    if (cmd[0] === PREFIX)
    {
        let commandfile = Ecki.commands.get(cmd.slice(PREFIX.length)) || Ecki.commands.get(Ecki.aliases.get(cmd.slice(PREFIX.length)));

        if (commandfile) commandfile.execute(Ecki, message, args);
    }
});


Ecki.on('ready', () => {
    console.log('Connecté !');

    Ecki.user.setStatus("online");

    // Afficher le nombre de joueurs toutes les 1s
    function joueurs() {
        
        ping(process.env.IP, 25565, (error, response) => {
            Ecki.user.setActivity("EpCraft " + response.onlinePlayers + "/" + response.maxPlayers, {type: 1});
        });
    }
    setInterval(joueurs, 1000);

});

