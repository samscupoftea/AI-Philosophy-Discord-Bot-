// open AI page
const OpenAI = require("openai")
const dotenv  = require("dotenv")
dotenv.config()


const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

async function main(x, y) {
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
}


module.exports = main;