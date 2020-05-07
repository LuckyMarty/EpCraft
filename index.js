const Discord = require('discord.js');
const Ecki = new Discord.Client();
const config = require('./config.json');
const ping = require('minecraft-server-util');

Ecki.login(config.token);

let PREFIX = config.prefix;


const {readdirSync} = require("fs");
const category = readdirSync('./commands');
// console.log(categoryList);

// Parcourrir la liste des commandes
const fs = require('fs');
Ecki.commands = new Discord.Collection();

for (let i=0 ; i<category.length ; i++)
{
    const commandFiles = fs.readdirSync('./Commands/' + category[i] + '/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles)
    {
        const command = require(`./Commands/${category[i]}/${file}`);
    
        Ecki.commands.set(command.name, command);
    }
}


// const commandFiles = fs.readdirSync('./Commands/Informations/').filter(file => file.endsWith('.js'));
// for (const file of commandFiles)
// {
//     const command = require(`./Commands/Informations/${file}`);

//     Ecki.commands.set(command.name, command);
// }



Ecki.on('ready', () => {
    console.log('Connecté !');

    Ecki.user.setStatus("online");

    // Afficher le nombre de joueurs toutes les 1s
    function joueurs() {
        ping(config.ip, 25565, (error, response) => {
            Ecki.user.setActivity("EPCraft " + response.onlinePlayers + "/" + response.maxPlayers, {type: 1});
        });
    }
    setInterval(joueurs, 1000);

});
// ________________________________________ //
//                COMMANDES
// ________________________________________ //
Ecki.on("message", message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "ip":
            Ecki.commands.get('ip').execute(message, args);
            break;
        case "facebook":
            Ecki.commands.get('facebook').execute(message, args);
            break;
        case "youtube":
            Ecki.commands.get('youtube').execute(message, args);
            break;
        case "site":
            Ecki.commands.get('site').execute(message, args);
            break;
        case "mc":
            Ecki.commands.get('mc').execute(message, args);
            break;
        case "help":
            Ecki.commands.get('help').execute(Ecki, message, args[1]);
            break;
    }

    // const command = Ecki.commands.get(args) || Ecki.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args));
    // if(!command) return;

    // if (command.args && !args.length) Ecki.commands.get('help').execute(Ecki, message, "");

    // if (command.args && args.length) Ecki.commands.get('help').execute(Ecki, message, args.length);
});