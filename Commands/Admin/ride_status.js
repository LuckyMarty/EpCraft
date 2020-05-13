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
        const config = require("../../config.json");
        const flags = require("../../json/drapeaux.json");
        const schedule = require('node-schedule');

        function groupArrayOfObjects(list, key) {
            return list.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        }

        async function clear() {
            let channel = Ecki.channels.cache.get("710085144387518515");
            await channel.messages.fetch({ limit: 100 }).then(messages => {
                channel.bulkDelete(messages)});
        }


        function embedStatus() {
            getJSON('https://epcraft.fr/api/coasters', function(error, response){

                // Grouper par Quartier
                let groupByLand = response.reduce(function (r, a) {
                    r[a.land] = r[a.land] || [];
                    r[a.land].push(a);
                    return r;
                }, Object.create(null));

                // Récuper le nom des Quartiers
                let listLand = Object.keys(groupByLand).sort();

                let allRidesStatus = [], rideEmoji = [];

                listLand.forEach(x => {
                    groupByLand[x].forEach(ride => {
                        if (ride.statut == "Ouvert")
                        {
                            allRidesStatus.push(ride);
                            rideEmoji.push(":white_check_mark:");
                        }

                        if (ride.statut == "Fermé")
                        {
                            allRidesStatus.push(ride);
                            rideEmoji.push(":x:");
                        }

                        if (ride.statut == "Construction")
                        {
                            allRidesStatus.push(ride);
                            rideEmoji.push(":warning:");
                        }
                    });
                });


                let channel = Ecki.channels.cache.get("710085144387518515");

                const status_ouvert = new Discord.MessageEmbed()
                .setTitle("**Ride Status**")
                
                // TRIER : OUVERT / FERME / CONSTRUCTION
                let allRidesStatus_per_land = groupArrayOfObjects(allRidesStatus, "land");
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
                            rideName += ":warning: " + ride.name + "\n";
                        }
                    });

                    let embedLand = "";
                    flags.pays.forEach(pays => {
                        if (pays.name === land.toLowerCase())
                        {
                            return embedLand = `__**${pays.flag}              ${land}              ${pays.flag}**__`;
                        } else return;
                    });

                    // AFFICHER
                    if (rideName != "")
                    {   
                        if (embedLand != "")
                        {
                            status_ouvert.addField(embedLand, rideName + "\n\n");
                        } else {
                            status_ouvert.addField(`__**${land}**__`, rideName + "\n\n");
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