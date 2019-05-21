const http = require('http')

const connect = http.get('http://a2.wykop.pl/appkey/aNd401dAPp', resp => {
    return `${resp.statusCode}: ${resp.statusMessage}`
})

const status = async (message) => {
    try {
      const embed = {
        title: 'Status połączenia',
        author: {
            name: 'Wykoparka',
            url: `https://github.com/SerekKiri/Wykoparka`,
            icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png'
          },
        description: connect,
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
  
  module.exports = status