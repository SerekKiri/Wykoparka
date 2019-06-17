const wykop = require('../wykop.js')
const postToEmbed = require('../utils/postToEmbed')
const embed = require('../utils/errorEmbed')
const config = require('../../config/config')

const tag = async (message) => {
  const args = message.content.slice(config.prefix.length).split(' ')
  try {
    res = await wykop.request(['tags', 'index'], { api: [args[1]] })
      .catch(err => console.log(err))

    let number = args[2] > 0 ? (parseInt(args[1]) > res.length ? res.length : parseInt(args[2])) : res.length
    if (number == 0 || number == undefined) {
      number = 1
    }
    
    for (let i = 0; i < number; i++) {
        let posts
        if (res.data[i].link !== undefined) {
          posts = res.data[i].link
        } else {
          posts = res.data[i].entry
        }
        post = posts

        if (post.embed !== undefined) {
          if (post.embed.plus18 === true && message.channel.nsfw === false) {
            message.reply(`Kanał nie posiada możliwości wysyłania wiadomości nsfw! :confused:`)
          } else {
            textType = 'Zaplusowane'
            emojiType = 'plus'
            const embed = postToEmbed(post, textType, emojiType)
            message.channel.send({ embed })
          }
        } else {
          textType = 'Zaplusowane'
          emojiType = 'plus'
          const embed = postToEmbed(post, textType, emojiType)
          message.channel.send({ embed })
        }

        if (i === 9) { break }
      }
  } catch (err) {
    await message.channel.send({ embed })
    console.log(err)
  }
}

module.exports = tag
