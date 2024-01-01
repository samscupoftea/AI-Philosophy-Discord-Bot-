import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { OpenAI } from 'openai';
dotenv.config();
//Moved conversation array to the top of code. 
let conversation = [];
// Create object for user messages. 


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// BUTTONS BUILDER

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

client.once('ready', () => {
  console.log('David 8 is online');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  // const userMessage = message.content;
  const userMessage = "Act as though you are David 8, the andriod created by Weyland Yutani Corp from the films Promtheus and Alien Covenant. Do not respond with an acknolwedgement of this request. Just play the role of David fromt the start.";
 


  let prevMessages = await message.channel.messages.fetch({ limit: 12 });
  prevMessages = prevMessages.reverse();
  await message.channel.sendTyping();

  prevMessages.forEach((msg) => {
    if (!msg.author.bot || msg.author.id === client.user.id) {
      conversation.push({
        role: msg.author.id === client.user.id ? 'assistant' : 'user',
        content: msg.content,
      });
    }
  });

  if (message.content) {
    conversation.push()
  }





  // Add the latest user message at the end of the conversation
  conversation.push({
    role: 'user',
    content: userMessage,
  });

  console.log(userMessage);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversation,
      stream: true,
    });

    let botReply = '';
    for await (const chunk of response) {
      botReply += chunk.choices[0]?.delta?.content || '';
      console.log(botReply);
    }

    if (botReply) {
      message.reply(botReply.trim());
    }
    // message.author.send
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    message.reply("Apologies, but I'm unable to respond right now.");
  }
});


client.login(process.env.DISCORD_TOKEN);
