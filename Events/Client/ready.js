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

    let msg = 0;
    function info()
    {
        switch (msg) {
            case 0:
                joueurs();
                return msg = 1;
                break;
        
            case 1:
                Ecki.user.setActivity("play.epcraft.fr (en 1.15.2)", {type: "PLAYING"});
                return msg = 0;
                break;
        } 
    }
//     setInterval(info, 5000);
    
//     const schedule = require('node-schedule');
//     let j = schedule.scheduleJob('0 2 * * *', function(){
//         console.log("Ride Status Sended");
//         Ecki.commands.get('ride_status').execute(Ecki, Ecki.messages, "");
//     });  
}
