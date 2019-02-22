/* eslint-disable no-unused-vars */
const Discord = require('discord.js')
const config = require('./config/config.json')
const client = require('./src/client')
// const client = new Discord.Client()
// const TurndownService = require('turndown')
// const turndownService = new TurndownService()

// imports
const commands = require('./src/commands')

if (process.env.NODE_ENV === 'production' || process.env.BOT_TOKEN !== undefined) {
  client.login(process.env.BOT_TOKEN)
} else {
  client.login(config.token)
}

client.on('ready', () => {
  client.user.setActivity('Oznacz mnie aby uzykać pomoc')
  console.log('Bot gotowy do przeglądania wykopu!')
})

client.on('message', async (message) => {
  try {
    commands.check(message)
  } catch (err) {
    console.log(err)
  }
})