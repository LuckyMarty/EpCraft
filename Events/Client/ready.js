const Discord = require('discord.js');
const Ecki = new Discord.Client();
const ping = require('minecraft-server-util');

module.exports = Ecki => {
    console.log('Connecté !');

    Ecki.user.setStatus("online");

    // Afficher le nombre de joueurs toutes les 1s
    function joueurs() {
        
        ping(process.env.IP, 25565, (error, response) => {
            Ecki.user.setActivity("EpCraft " + response.onlinePlayers + "/" + response.maxPlayers +" (!help)", {type: "PLAYING"});
        });
    }
    setInterval(joueurs, 1000);
}
