/* eslint-disable no-unused-vars */
const TurndownService = require('turndown')
const turndownService = new TurndownService()
const {col, emoji} = require('../../common/index.js')
const client = require('../client')

function postToEmbed (post) {
  let des
  let text
  let image
  let tit

  if (post.description !== undefined) {
    des = post.description
  } else {
    des = post.body
  }

  if (post.tags !== undefined) {
    text = turndownService.turndown(`**${post.tags}**`) + '\n\n'
  } else {
    text = ''
  }

  if (post.embed !== undefined) {
    image = post.embed.url
  }

  if (post.title !== undefined) {
    tit = turndownService.turndown(post.title)
  } else {
    tit = ''
  }

  const embed = {
    title: tit,
    description: text + turndownService.turndown(des),
    color: col[post.author.color],
    timestamp: post.date,
    url: post.source_url,
    author: {
      name: post.author.login + ' ' + emoji[post.author['sex']],
      url: `https://wykop.pl/ludzie/${post.author.login}/`,
      icon_url: post.author.avatar
    },
    thumbnail: {
      url: image
    },
    footer: {
      icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
      text: 'Wykoparka by Kiritito, Mickson & takidelfin'
    },
    fields: [
      {
        name: `${client.emojis.find('name', `${emojiType}`)} ${textType} przez`,
        value: `${post.vote_count} osób`,
        inline: true
      },
      {
        name: '💬 Skomentowane przez',
        value: `${post.comments_count} osób`,
        inline: true
      }
    ]
  }
  return embed
};

module.exports = postToEmbed
