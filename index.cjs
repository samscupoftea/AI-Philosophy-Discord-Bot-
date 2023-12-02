// open AI page
const OpenAI = require("openai")
const dotenv  = require("dotenv")
dotenv.config()






// client.on("ready", (x) => {
//   console.log(`${x.user.tag} is ready`);
//   client.user.setActivity("hello how you doing")

// })

// client.login(token)




const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

}



main();