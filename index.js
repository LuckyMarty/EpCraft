const Discord = require('discord.js');
const Ecki = new Discord.Client();
const ping = require('minecraft-server-util');
const fs = require('fs');

const collections = ['commands', 'aliases', 'cooldowns'];
collections.forEach(x => Ecki[x] = new Discord.Collection());

Ecki.login(process.env.TOKEN);
const PREFIX = process.env.PREFIX;


// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
Ecki.giveawaysManager = new GiveawaysManager(Ecki, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});


// // CHERCHER LA COMMANDE ET ALIAS
// const category = fs.readdirSync('./Commands');

// for (let j=0 ; j<category.length ; j++)
// {
//     fs.readdir("./Commands/"+category[j], (err, files) => {
//         if (err) console.log(err);

//         let jsfile = files.filter(f => f.split(".").pop() === "js");
        
//         if (jsfile.length <= 0)
//         {
//             return console.log("[LOGS] Impossible de trouver la commande !");
//         }

//         jsfile.forEach((f, i) => {
//             let pull = require(`./Commands/${category[j]}/${f}`);
//             Ecki.commands.set(pull.name, pull);      //Chercher la commande
//             pull.aliases.forEach(alias => {
//                 Ecki.aliases.set(alias, pull.name);  //Chercher l'alias de la commande
//             });
//         });
//     });
// }

const loadCommands = (dir = "./Commands") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            Ecki.commands.set(getFileName.name, getFileName);
            console.log("Commande chargée : " + getFileName.name);
        }
    });
}

const loadEvents = (dir = "./Events") => {
    fs.readdirSync(dir).forEach(dirs => {
        const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split('.')[0];
            Ecki.on(evtName, evt.bind(null, Ecki));
            console.log("Evénement chargé : " + evtName);
        }
    });
}

loadCommands();
loadEvents();

// Ecki.on("message", message => {
//     Ecki.commands.get('visiteur').execute("", message, "");
    
//     if (!message.content.startsWith(PREFIX) || message.author.bot) return;

//     let args = message.content.slice(PREFIX.length).split(/ +/);
//     let cmd = args.shift().toLowerCase();
    
//     let commandfile = Ecki.commands.get(cmd) || Ecki.commands.get(Ecki.aliases.get(cmd));
//     if (!commandfile) return;

//     if (commandfile.permissions && !message.member.hasPermission('ADMINISTRATOR')) return message.reply("Tu n'as pas de permission pour cette commande !");
   
//     // Ajouter des informations sur le Handler
//     if (commandfile.args && !args.length)
//     {
//         let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author} !`;
//         if (commandfile.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${PREFIX}${commandfile.name} ${commandfile.usage}\``;
//         return message.channel.send(noArgsReply);
//     }
    
//     commandfile.execute(Ecki, message, args);
// });


// Ecki.on('ready', () => {
//     console.log('Connecté !');

//     Ecki.user.setStatus("online");

//     // Afficher le nombre de joueurs toutes les 1s
//     function joueurs() {
        
//         ping(process.env.IP, 25565, (error, response) => {
//             Ecki.user.setActivity("EpCraft " + response.onlinePlayers + "/" + response.maxPlayers +" (!help)", {type: "PLAYING"});
//         });
//     }
//     setInterval(joueurs, 1000);

// });

// Ecki.on('guildMemberAdd', member => {
//     const welcome = member.guild.channels.cache.find((channel) => channel.id === "430047753507176451");
//     if (!welcome) return;
//     return welcome.send(`Bienvenue à ${member.user} sur EpCraft !`);
// });

// Ecki.on('guildMemberRemove', member => {
//     const inLog = member.guild.channels.cache.find((channel) => channel.id === "708624241053925396");
//     if (!inLog) return;

//     const embed_Quite_User = new Discord.MessageEmbed()
//     .setColor("#dc143c")
//     .setTitle(`${member.user.username} nous a quité`)
//     .setTimestamp();
//     return inLog.send(embed_Quite_User);
// });
