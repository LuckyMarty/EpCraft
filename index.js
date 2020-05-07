const Discord = require('discord.js');
const Ecki = new Discord.Client();
const ping = require('minecraft-server-util');
const fs = require('fs');

Ecki.login(process.env.TOKEN);
const PREFIX = process.env.PREFIX;

const category = fs.readdirSync('./Commands');
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

// ________________________________________ //
//                COMMANDES
// ________________________________________ //
Ecki.on("message", message => {
    let args = message.content;
    // console.log(args[0]);

    if (args[0] === PREFIX)
    {
        args = message.content.substring(PREFIX.length).split(" ");

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

