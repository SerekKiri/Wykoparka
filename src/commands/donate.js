const TurndownService = require('turndown')
const turndownService = new TurndownService()
const embed = require('../utils/errorEmbed')

const donate = async (message) => {
  try {
    const embed = {
      title: 'Donate us by PayPal',
      'author': {
        'name': 'Paypal.me',
        'url': 'https://www.paypal.me',
        'icon_url': 'https://i.imgur.com/CxxgcQH.png'
      },
      description: turndownService.turndown('<a href="https://www.paypal.me/kiritito">Donate Link</a>'),
      color: 151511,
      footer: {
        icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
        text: 'Wykoparka by Kiritito, Mickson & takidelfin'
      }
    }
    await message.channel.send({ embed })
  } catch (err) {
    await message.channel.send({ embed })
    console.log(err)
  }
}

module.exports = donate