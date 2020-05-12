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
