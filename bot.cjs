// Discord page
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
const Discord = require('discord.js');
const Client = Discord.Client;
const GatewayIntentBits = Discord.GatewayIntentBits;

// import { Client, GatewayIntentBits } from 'discord.js';
const main = require('./index.cjs')
dotenv.config();



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});






client.login(process.env.DISCORD_TOKEN);