module.exports = {
    name: 'ride_status_force',
    aliases: ['rsf'],
    description: "Forcer à afficher une liste des attractions ouvertes, fermées ou/et en maintenance",
    category: "admin",
    cooldown: 5,
    usage: '',
    permissions: true,
    isUserAdmin: false,
    
    execute(Ecki, message, args) {
        const Discord = require('discord.js');
        const getJSON = require('get-json');
        const schedule = require('node-schedule');


        async function clear() {
            let channel = Ecki.channels.cache.get("685837132673056778");
            await channel.messages.fetch({ limit: 100 }).then(messages => {
                channel.bulkDelete(messages)});
        }


        function embedStatus() {
            getJSON('https://www.epcraft.fr/api/coasters', function(error, response){

                // Grouper par Quartier
                let groupByLand = response.data.reduce(function (r, a) {
                    r[a.land.name] = r[a.land.name] || [];
                    r[a.land.name].push(a);
                    return r;
                }, Object.create(null));

                // Récuper le nom des Quartiers
                let listLand = Object.keys(groupByLand).sort();

                let allRidesStatus = [];

                listLand.forEach(x => {
                    groupByLand[x].forEach(ride => {
                        allRidesStatus.push(ride);
                    });
                });

                let channel = Ecki.channels.cache.get("685837132673056778");

                const status_ouvert = new Discord.MessageEmbed()
                .setTitle("**Ride Status**")
                
                // // TRIER : OUVERT / FERME / CONSTRUCTION
                let allRidesStatus_per_land = allRidesStatus.reduce(function (r, a) {
                    r[a.land.name] = r[a.land.name] || [];
                    r[a.land.name].push(a);
                    return r;
                }, Object.create(null));

                Object.keys(allRidesStatus_per_land).forEach(land => {

                    let rideName = "";

                    // OUVERT
                    allRidesStatus_per_land[land].forEach(ride => {
                        if (ride.statut == "Ouvert")
                        {
                            rideName += ":white_check_mark: " +  ride.name + "\n";
                        }
                    });

                    // FERME
                    allRidesStatus_per_land[land].forEach(ride => {
                        if (ride.statut == "Fermé")
                        {
                            rideName += ":x: " + ride.name + "\n";
                        }
                    });

                    // CONSTRUCTION
                    allRidesStatus_per_land[land].forEach(ride => {
                        if (ride.statut == "Construction")
                        {
                            rideName += ":construction_site: " + ride.name + "\n";
                        }
                    });

                    // Afficher le Pays en titre
                    let embedLand = "";
                    allRidesStatus.forEach(landName => {
                        if (landName.land.name.toLowerCase() === land.toLowerCase())
                        {
                            return embedLand = `__**${landName.land.emoji}              ${land}              ${landName.land.emoji}**__`;
                        } else return;
                    });


                    // AFFICHER
                    if (rideName != "")
                    {   
                        if (embedLand != "")
                        {
                            status_ouvert.addField(embedLand, rideName + "\n\n");
                        } else {
                            status_ouvert.addField(`__**${land}**__`, rideName);
                        }
                    }
                    else return;
                    rideName = "";
                    embedLand = "";
                });
                channel.send(status_ouvert);
            });
        }
        clear();
        embedStatus();
    }
}
