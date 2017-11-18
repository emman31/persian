const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Raid = require("./persian/Raid.js");

console.log("Starting bot...\n");

const raidReactions = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];


// Loading secrets.
var secretsString = fs.readFileSync(__dirname + "/secrets.json");
var secrets = JSON.parse(secretsString);
console.log("Finished loading secrets. shhh...");

client.on("ready", () => {
    var meowth = client.users.find('username', "Meowth 2.0");
    if (!meowth) {
        console.log("Can't have Persian without a Meowth first!");
    }
    

    console.log("Persian up!");
});
client.on("message", (message) => {
    if (message.author.username == 'emman31' || message.content.startsWith("!list-raid")) {
        var current_raids = [];
        var commandInitiator = message.author;

        // TODO: store raids in a database.
        current_raids.push(new Raid(`<div class="markup">[Golden Square Mile] <strong>Suicune</strong> - Level: 5 - CP: 34471
<br><strong>Moveset</strong>: Hidden Power - Water Pulse

<strong>Start</strong>: 06:41:24PM
<strong>End</strong>: 02:35:24AM

<strong>Current Team</strong>: Instinct

<strong>Address</strong>: 1572-1590 Avenue du Docteur-Penfield
<strong>Map</strong>: <a title="https://montrealpokemap.com/gym.html#45.496455,-73.586428" href="https://montrealpokemap.com/gym.html#45.496455,-73.586428" target="_blank" rel="noreferrer">https://montrealpokemap.com/gym.html#45.496455,-73.586428</a>
<strong>Google Map</strong>: <a title="https://maps.google.com/maps?q=45.496455,-73.586428" href="https://maps.google.com/maps?q=45.496455,-73.586428" target="_blank" rel="noreferrer">https://maps.google.com/maps?q=45.496455,-73.586428</a>
<span class="mention">@-----------------------------------</span></div>`));

current_raids.push(new Raid(`<div class="markup"><strong>Suicune</strong> - Level: 5 - CP: 34471
<br><strong>Moveset</strong>: Hidden Power - Hydro Pump

<strong>Start</strong>: 06:40:50PM
<strong>End</strong>: 02:40:50AM

<strong>Current Team</strong>: Mystic

<strong>Address</strong>: 4391 Rue Rivard
<strong>Map</strong>: <a title="https://montrealpokemap.com/gym.html#45.523832,-73.580785" href="https://montrealpokemap.com/gym.html#45.523832,-73.580785" target="_blank" rel="noreferrer">https://montrealpokemap.com/gym.html#45.523832,-73.580785</a>
<strong>Google Map</strong>: <a title="https://maps.google.com/maps?q=45.523832,-73.580785" href="https://maps.google.com/maps?q=45.523832,-73.580785" target="_blank" rel="noreferrer">https://maps.google.com/maps?q=45.523832,-73.580785</a>
<span class="mention">@-----------------------------------</span></div>`));

        // TODO: cron, or anyway to clean up database of expired raids.


        // Build a list of available raids.
        var raidText = "";
        for (var i = 0; i < current_raids.length; i ++) {
            raidText += current_raids[i].GetDescription() + "\n";
        }

        var raids = [];
        message.channel.send(raidText).then(function (message) {

            // Keep a list of raids for the current message.
            // TODO: test concurent messages.
            raids[message.id] = current_raids;
            var messageId = message.id;

            message.react(raidReactions[0]);
            var current_id = 1;
            message.awaitReactions(function(reaction) {
                // Use awaitReactions to place initial reactions, to make sure it's all in the right order.
                if (current_id < current_raids.length) {
                    message.react(raidReactions[current_id]);
                    current_id++;
                }
                
                // If a reaction reaches '2', that means the user has selected a raid.
                if (reaction.count >= 2 && reaction.users.find('username', commandInitiator.username)) {
                    // Find the chosen raid.
                    for (var i = 0; i < raidReactions.length; i ++) {
                        if (raidReactions[i] == reaction.emoji.name) {
                            // Send Meowth's command.
                            message.channel.send(raids[message.id][i].GetMeowthCommand());
                        }
                    }
                    // remove the message to clear cluster...
                    message.delete();
                }
            });
        });
    }

    if (message.author.username == "Meowth 2.0") { 
        // TODO: detect meowth's raid channel and dispatch starting commands?
        //console.log(message.author);
        /*if (message.channel.name == 'general') {
            matches = /<#(\d*)>/.exec(message.content)
            console.log(matches);
            message.channel.send(matches[1]);
            client.channels.get(matches[1]).send("This is a test");
        }*/
    }
});
  
client.login(secrets.discord_bot_token);