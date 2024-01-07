import dotenv from 'dotenv';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { OpenAI } from 'openai';
dotenv.config();
//Moved conversation array to the top of code. 
let conversation = [];
let botIntroMsg = "My fellow thinker, I am a philosophy bot. Please select a Philosopher you would like to converse with and/or question.";
const botButtons = [
  { label: "Plato", customId: "Plato"},
  { label: "Socrates", customId: "Socrates"},
  { label: "Nietzsche", customId: "Nietzsche"},

];


let plato = "Plato";
let socrates = "Socrates";
let nietzsche = "Nietzsche";
//


const platoMessage = `In this chat, do not provide any explanations of code. Only use single-letter variable names. Generate 1 example of a modern JavaScript code-reading challenge you might get in a job interview. The difficulty level should be ${plato} For these examples, use a mixture of different array methods.`;
    const socratesMessage = `In this chat, do not provide any explanations of code. Only use single-letter variable names. Generate 1 example of a modern JavaScript code-reading challenge you might get in a job interview. The difficulty level should be ${socrates} For these examples, use a mixture of different array methods.`;
    const nietzscheMessage = `In this chat, do not provide any explanations of code. Only use single-letter variable names. Generate 1 example of a modern JavaScript code-reading challenge you might get in a job interview. The difficulty level should be ${nietzsche} For these examples, use a mixture of different array methods.`;
// Create object for user messages. 


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// BUTTONS BUILDER
//AI API KEY 
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});
/////////////////////////////////
// Bot Online
client.once('ready', () => {
  console.log('Philosophy Bot is online');
});

////////////////////////////////////

  // const userMessage = "You are a philosphy bot.";
 // BUTTON BUILDER

 const row = new ActionRowBuilder().addComponents(
  botButtons.map((button) =>
    new ButtonBuilder()
      .setCustomId(button.customId)
      .setLabel(button.label)
      .setStyle(ButtonStyle.Primary)
  )
);

client.on("messageCreate", async (message) => {
  console.log(message);
  if (message.author.bot) return;
  if (message.content !== "!plato" && message.content !== "!socrates" && message.content !== "!nietzsche") {
    return message.reply({ content: botIntroMsg, components: [row] });
  }


  let prevMessages = await message.channel.messages.fetch({ limit: 50 });
  prevMessages = prevMessages.reverse();
  await message.channel.sendTyping();

  prevMessages.forEach((msg) => {
    if (!msg.author.bot || msg.author.id === client.user.id) {
      pushIntoArray(conversation,
        msg.author.id === client.user.id ? 'assistant' : 'user',
        msg.content
      );
    }
  });

  if (message.content) {
    conversation.pushIntoArray()
  }
  switch (message.content) {
    case "!plato":
      pushIntoArray(conversation, "assistant", platoMessage);
      break;
    case "!socrates":
      pushIntoArray(conversation, "assistant", socratesMessage);
      break;
    case "!nietzsche":
      pushIntoArray(conversation, "assistant", nietzscheMessage);
  }

  function pushIntoArray(array, role, content) {
    array.push({
      role: role,
      content: content,
    });

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
      (await message.reply(botReply.trim()));
    };
    // message.author.send
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    message.reply("Apologies, but I'm unable to respond right now.");
  }
});


client.login(process.env.DISCORD_TOKEN);
