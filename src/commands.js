/* eslint-disable eqeqeq */
const config = require('../config/config.json')

// requiring commands
const help = require('./commands/help')
const main = require('./commands/main')
const user = require('./commands/user')
const mirko = require('./commands/mirko')
const tag = require('./commands/tag')
const donate = require('./commands/donate')
const github = require('./commands/github')
const invite = require('./commands/invite')
const status = require('./commands/status')

const commands = {
  'help': help,
  'główna': main,
  'znajdź': user,
  'mirko': mirko,
  'tag': tag,
  'donate': donate,
  'github': github,
  'zaproszenie': invite,
  'status': status
}

module.exports.check = async (message) => {
  let args = message.content.slice(config.prefix.length).split(' ')
  const pref = message.content.toLowerCase().startsWith(config.prefix)

  if (pref) {
    if (commands[args[0]] != undefined) {
      return commands[args[0]](message)
    } else {
      return message.reply(`Nie znalazłam takiej komendy ${message.client.emojis.find('name', 'sadcat')}`)
    }
  }

  if (message.isMentioned('459391891687997451')) {
    help(message)
  }
}
