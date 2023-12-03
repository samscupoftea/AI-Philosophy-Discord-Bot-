


import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import main from './index.cjs';



dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
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

  console.log(prevMessages)

  prevMessages 

  prevMessages.forEach((msg) => {
    if (!msg.author.bot || msg.author.id === client.user.id) {
      conversation.push({
        role: msg.author.id === client.user.id ? 'assistant' : 'user',
        content: msg.content,
      });
    }
  });

  main(conversation, userMessage)


 


});



client.login(process.env.DISCORD_TOKEN);
