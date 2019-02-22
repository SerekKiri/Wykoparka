const TurndownService = require('turndown')
const turndownService = new TurndownService()

const client = require('../client')

module.exports = invite = async (message) => {
    try {
        client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD'])
        .then(link => {
          const embed = {
            title: 'Specjalnie dla Ciebie wygenerowałem link:',
            description: turndownService.turndown(`<a href="${link}">Kliknij tutaj aby mnie zaprosić!</a>`),
            color: 1554076,
            footer: {
              icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
              text: 'Wykoparka by Kiritito, Mickson & takidelfin'
            }
          }
          message.channel.send({ embed })
        })
    } catch (err) {
        console.log(err)
    }
}