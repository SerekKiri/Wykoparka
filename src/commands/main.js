const wykop = require('../wykop.js')
const postToEmbed = require('../utils/postToEmbed')
const embed = require('../utils/errorEmbed')
const config = require('../../config/config')

const main = async (message) => {
  const args = message.content.slice(config.prefix.length).split(' ')
  try {
    res = await wykop.request(['Links', 'Promoted'], {})
      .catch(err => console.log(err))

    posts = res.data

    let number = args[1] > 0 ? (parseInt(args[1]) > res.length ? res.length : parseInt(args[1])) : res.length
    if (number == 0 || number == undefined) {
      number = 1
    }
    for (let i = 0; i < number; i++) {
        post = posts[i]
        if (post.plus18 === true && message.channel.nsfw === false) {
          message.reply(`Kanał nie posiada możliwości wysyłania wiadomości nsfw! :confused:`)
        } else {
          textType = 'Wykopane'
          emojiType = 'wykop'
          const embed = postToEmbed(post, emojiType)
          message.channel.send({ embed })
        }
        if (i === 9) { break }
      }
  } catch (err) {
    await message.channel.send({ embed })
    console.log(err)
  }
}

module.exports = main
