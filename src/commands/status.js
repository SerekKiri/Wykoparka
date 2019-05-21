const embed = require('../utils/errorEmbed')
const http = require('http')

// variables

var ddd
var url
var col

const connect = http.get('http://a2.wykop.pl/appkey/aNd401dAPp', async response => {
    if (response.statusCode != 200) {
      ddd = 'Serwerowania się pali'
      url = 'https://www.wykop.pl/cdn/c3201142/comment_j6Go0TZW01xAT8SJwPhPLllhllIk4gFl.jpg'
      col = 16711731
    } else {
      ddd = '**200:** *Chyba działam*'
      url = 'https://static.goldenline.pl/user_photo/121/user_49017_74ab56_huge.jpg'
      col =  3407716
    }

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
        description: ddd,
        color: col,
        image: {
          url: url
        },
        footer: {
          icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
          text: 'Wykoparka by Kiritito, Mickson & takidelfin'
        }
      }
      await message.channel.send({ embed }) 
    } catch (err) {
      message.channel.send({ embed })
      console.log(err)
    }
}
  
module.exports = status