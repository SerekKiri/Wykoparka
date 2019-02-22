const TurndownService = require('turndown')
const turndownService = new TurndownService()
const embed = require('../utils/errorEmbed')

const github = async (message) => {
  try {
    const embed = {
      title: 'Github Repository',
      'author': {
        'name': 'Github.com',
        'url': 'https://www.github.com',
        'icon_url': 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
      },
      description: turndownService.turndown('<a href="https://github.com/animek66/Wykoparka">Repository link for wykoparka</a>'),
      color: 2369838,
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

module.exports = github
