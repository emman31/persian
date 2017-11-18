const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

console.log("Starting bot...\n");

// Loading secrets.
var secretsString = fs.readFileSync(__dirname + "/secrets.json");
var secrets = JSON.parse(secretsString);
console.log("Finished loading secrets. shhh...");

client.on("ready", () => {
    console.log("Persian up!");
});
client.on("message", (message) => {
    if (message.author.username == 'emman31' || message.content.startsWith("!list-raid")) {
        message.channel.send("TEST").then(function (message) {
            
            //console.log(client.emojis);
            //var one = client.emojis.find("name", "one");
            //console.log(one);
            //message.react(":one:");
            //message.reply(client.emojis.first());
            message.awaitReactions(function(reaction) {
                message.reply(reaction);

                message.channel.send("!raid Suicune test road 30");
            });
        });
    }

    if (message.author.username == "Meowth 2.0") { 
        if (message.channel.name == 'general') {
            matches = /<#(\d*)>/.exec(message.content)
            console.log(matches);
            message.channel.send(matches[1]);
            client.channels.get(matches[1]).send("This is a test");
        }
    }
});
  
client.login(secrets.discord_bot_token);