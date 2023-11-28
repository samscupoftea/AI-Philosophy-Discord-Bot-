const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.on("ready", () => {
    console.log("Hal 9000 is online") //when hal is online
});
client.login(token);


// Create an object to store whether the bot has replied to each user
const repliedUsers = {};


client.on('messageCreate', (msg) => {
    console.log(`Received message from ${msg.author.username}: ${msg.content}`);
    
    // Check if the message is from a user and not the bot itself
    if (msg.author.bot) return;

    // Check if the user has already received a reply
    if (!repliedUsers[msg.author.id]) {
        // Send the reply
        msg.reply('Hello Dave. You are looking well today.');

        // Set the flag to indicate that the user has received a reply
        repliedUsers[msg.author.id] = true;
    }
});
