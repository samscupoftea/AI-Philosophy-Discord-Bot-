// // Discord page
// const dotenv = require('dotenv');
// const Discord = require('discord.js');
// const Client = Discord.Client;
// const GatewayIntentBits = Discord.GatewayIntentBits;
// const main = require('./index.cjs')
// dotenv.config();





// client.on('ready', () => {
//   console.log('THE BOT IS ONLINE')
// });





// client.login(process.env.DISCORD_TOKEN);


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
 
  
  let conversation = [];
  conversation.push({
    role: 'system',
    content: userMessage,
  });

  let prevMessages = await message.channel.messages.fetch({ limit: 12 });

  prevMessages.forEach((msg) => {
    if (!msg.author.bot || msg.author.id === client.user.id) {
      conversation.push({
        role: msg.author.id === client.user.id ? 'assistant' : 'user',
        content: msg.content,
      });
    }
  });


  console.log(userMessage);



  try {
    const reponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversation,
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
