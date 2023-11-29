// import OpenAI from "openai";
import { OpenAIApi, Configuration } from "openai";
// console.log(OpenAI.Assistants)


import { Client, GatewayIntentBits } from "discord.js"

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const token = process.env.DISCORD_TOKEN;

const openaiApiKey = process.env.OPEN_API_KEY;
const configuration = new Configuration({
    apiKey: openaiApiKey,
});

//async code 
console.log(OpenAI)

async function ask(prompt){
    const response = await  OpenAI.createCompletion({
        model: "gpt-3.5-turbo",
        prompt,


})

const answer =response.data.choices[0].text;
console.log(answer); 
};
ask('hello')

if (!token) {
    console.error("Please provide a valid Discord bot token in the .env file.");
    process.exit(1);
}





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

