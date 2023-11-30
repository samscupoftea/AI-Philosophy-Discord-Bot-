// import { Client, GatewayIntentBits } from "discord.js";
// import { config as dotenvConfig } from 'dotenv';
// import OpenAI from "openai";

// dotenvConfig();

// const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
// const token = process.env.DISCORD_TOKEN;

// const client = new Client({
//     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
// });

// client.once('read', () => {
//   console.log('Hal 9000 is now O N L I N E! ');
// })

// client.on('messageCreate', async (msg) => {
//     if (msg.author.bot) return;
    
// const processedContent = msg.content.trim();
//     try {
//         const stream = await openai.chat.completions.create({
//             model: "gpt-4",
//             messages: [{ role: "user", content: msg.content }],
//             stream: true,
//             temperature: 0,
//             top_p: 0.95,

//         });

//         let responseContent = "";
//         let timeoutId;

//         const collectResponse = async () => {
//             for await (const chunk of stream) {
//                 responseContent += chunk.choices[0]?.delta?.content || "";
//                 clearTimeout(timeoutId);
//                 timeoutId = setTimeout(() => {
//                     if (responseContent) {
//                         msg.reply(responseContent);
//                         console.log(`Replied to ${msg.author.username}: ${responseContent}`);
//                     }
//                 }, 500); // Wait for 500ms for additional chunks
//             }
//         };

//         collectResponse();

//     } catch (error) {
//         console.error("Error asking OpenAI:", error);
//         msg.reply("Apologies, Dave. But that is not possible right now.");
//     }
// });

// client.login(token);


//require('dotenv/config');
// const { Client } = require('discord.js');
// const { OpenAIApi } = require('openai');

import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { OpenAI } from 'openai';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

client.once('ready', () => {
  console.log('Bot is online');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const userMessage = message.content;

  console.log(userMessage);

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }],
      stream: true,
    });

    let botReply = '';
    for await (const chunk of stream) {
      botReply += chunk.choices[0]?.delta?.content || '';
    }

    if (botReply) {
      message.reply(botReply.trim());
    }
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    message.reply("Apologies, but I'm unable to respond right now.");
  }
});

client.login(process.env.DISCORD_TOKEN);
