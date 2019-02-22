const wykop = require('../wykop.js')
const {col, emoji} = require('../../common/index')

const user = async (message) => {
  var mes = message.content.slice(13)

  try {
    res = await wykop.request(['Profiles', 'Index'], {
      api: [mes]
    })

    userProfile = res.data
    const embed = {
      title: userProfile.about,
      author: {
        name: userProfile.login + ' ' + emoji[userProfile.sex],
        url: `https://www.wykop.pl/ludzie/${userProfile.login}`,
        icon_url: userProfile.avatar
      },
      description: `Wykopał ${userProfile.diggs} postów, \nDołączył do wykopu: ${userProfile.signup_at}, \nNumer w rankingu: ${userProfile.rank}`,
      color: col[userProfile.color],
      footer: {
        icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
        text: 'Wykoparka by Kiritito, Mickson & takidelfin'
      },
      fields: [
        {
          name: 'Obserwowany przez',
          value: `${userProfile.followers} osób`,
          inline: true
        },
        {
          name: 'Obserwuje',
          value: `${userProfile.following} osób`,
          inline: true
        }
      ]
    }
    await message.channel.send({ embed })
  } catch (err) {
    const embed = {
      author: {
        name: 'Wykop.pl',
        url: `https://www.wykop.pl/ludzie/${mes}`,
        icon_url: 'http://www.userlogos.org/files/logos/Karmody/wykop_03.png'
      },
      color: 16711731,
      description: `Przyrko mi ale nie znalazłem użytkownika o nazwie **${mes}**`,
      footer: {
        icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
        text: 'Wykoparka by Kiritito, Mickson & takidelfin'
      }
    }
    await message.channel.send({ embed })
    console.log(err)
  }
}

module.exports = user
