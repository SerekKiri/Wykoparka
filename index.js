const Discord = require('discord.js')
const config = require('./src/config.json')
const Wykop = require('wykop-es6')
const client = new Discord.Client()
const TurndownService = require('turndown')
const turndownService = new TurndownService()
const col = {
  0: 3381555,
  1: 16734487,
  2: 12255232,
  5: 0,
  1001: 10066329,
  1002: 10066329,
  2001:  4157344
}

const emoji = {
  male:   '👨',
  female: '👩'
}

const wykop = new Wykop(config.key, config.secret)

function Round(n, k)
{
  const factor = Math.pow(10, k)
  return Math.round(n*factor)/factor
}

if (process.env.NODE_ENV === 'production' || process.env.BOT_TOKEN !== undefined) {
  client.login(process.env.BOT_TOKEN)
} else {
  client.login(config.token)
}

client.on('ready', () => {
  client.user.setPresence({ game: { name: 'Wykop.pl', type: 3 } })
  console.log('Bot gotowy do przeglądania wykopu!')
})

client.on('message', async (message) => {
  if (message.content.substring(0, config.prefix.length) === config.prefix || config.prefix1) {
    const command = message.content.slice(config.prefix.length || config.prefix1.length)
    const args = command.split(' ')
    
    if (args[0] === 'główna') {
      const popular =  await wykop.request('Popular', 'Promoted')
      const iterations = args.length > 1 ? (parseInt(args[1]) > popular.length ? popular.length : parseInt(args[1])) : popular.length
      for (let i = 0; i < iterations; i++) {
        const element = popular[i]
        const embed = {
          title: element.title,
          description: element.description,
          color: col[element.author_group],
          timestamp: element.date,
          url: element.url,
          author: {
            name: element.author + ' ' +  emoji[element.author_sex],
            url: `https://wykop.pl/ludzie/${element.author}/`,
            icon_url: element.author_avatar
          },
          thumbnail: {
            url: element.preview
          },
          footer: {
            icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
            text: 'Wykoparka by Kiritito, Mickson & takidelfin'
          },
          fields: [
            {
              name: `${client.emojis.find('name', 'wykop')} Wykopane przez`,
              value: `${element.vote_count} osób`,
              inline: true
            },
            {
              name: '💬 Skomentowane przez',
              value: `${element.comment_count} osób`,
              inline: true
            }
          ]
        }
        await message.channel.send({ embed })
      }
    }

    if (args[0] === 'mirko') {
      const mirko = await wykop.request('Stream', 'Hot', { api: { page: 1, period: 6 }})
      const iterations = args.length > 1 ? (parseInt(args[1]) > mirko.length ? mirko.length : parseInt(args[1])) : mirko.length
      for (let i = 0; i < iterations; i++ ) {
        try {
          const element = mirko[i]
          const img = element.embed ? element.embed.url : null

          if (element.embed !== null && element.embed.plus18 !== false) {
            if (message.channel.nsfw === true) {
              const embed = {
                timestamp: element.date,
                author: {
                  name: element.author  + ' ' +  emoji[element.author_sex],
                  url: `https://wykop.pl/ludzie/${element.author}/`,
                  icon_url: element.author_avatar
                },
                color: col[element.author_group],
                description: turndownService.turndown(element.body) + '\n \n' +  turndownService.turndown(`<a href="${element.url}">Link do wpisu</a>`),
                'image': { 
                  'url': img
                }, 
                footer: {
                  icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
                  text: 'Wykoparka by Kiritito, Mickson & takidelfin'
                },
                fields: [
                  {
                    name: `${client.emojis.find('name', 'plus')} Splusowane przez`,
                    value: `${element.vote_count} osób`,
                    inline: true
                  },
                  {
                    name: '💬 Skomentowane przez',
                    value: `${element.comment_count} osób`,
                    inline: true
                  }
                ]
              }
              await message.channel.send({ embed })
            } else {
              const embed = {
                timestamp: element.date,
                author: {
                  name: element.author + ' ' +  emoji[element.author_sex],
                  url: `https://wykop.pl/ludzie/${element.author}/`,
                  icon_url: element.author_avatar
                },
                color: 15859772,
                description: turndownService.turndown(element.body) + '\n \n' +  turndownService.turndown(`<a href="${element.url}">Link do wpisu</a>`),
                'image': { 
                  'url': 'https://www.wykop.pl/cdn/c2526412/nsfw.jpg'
                }, 
                footer: {
                  icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
                  text: 'Wykoparka by Kiritito, Mickson & takidelfin'
                },
                fields: [
                  {
                    name: `${client.emojis.find('name', 'plus')} Splusowane przez`,
                    value: `${element.vote_count} osób`,
                    inline: true
                  },
                  {
                    name: '💬 Skomentowane przez',
                    value: `${element.comment_count} osób`,
                    inline: true
                  }
                ]
              }
              await message.channel.send({ embed })
            }
          }

          const embed = {
            timestamp: element.date,
            author: {
              name: element.author + ' ' +  emoji[element.author_sex],
              url: `https://wykop.pl/ludzie/${element.author}/`,
              icon_url: element.author_avatar
            },
            color: col[element.author_group],
            description: turndownService.turndown(element.body) + '\n \n' +  turndownService.turndown(`<a href="${element.url}">Link do wpisu</a>`),
            'image': { 
              'url': img
            }, 
            footer: {
              icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
              text: 'Wykoparka by Kiritito, Mickson & takidelfin'
            },
            fields: [
              {
                name: `${client.emojis.find('name', 'plus')} Splusowane przez`,
                value: `${element.vote_count} osób`,
                inline: true
              },
              {
                name: '💬 Skomentowane przez',
                value: `${element.comment_count} osób`,
                inline: true
              }
            ]
          }

          await message.channel.send({ embed })
        } catch (err) {
          console.log(err)
        }
      }
    }
    
    if (command === 'zaproszenie') {
      client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD'])
        .then(link => {
          const embed = { 
            title: 'Specjalnie dla Ciebie wygenerowałem link:',
            description: turndownService.turndown(`<a href="${link}">Kliknij aby mnie zaprosić!</a>`),
            color:  1554076,
            footer: {
              icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
              text: 'Wykoparka by Kiritito, Mickson & takidelfin'
            }
          }
          message.channel.send({ embed })
        })
    }
      
    if (args[0] === 'znajdź') {
      try { args.shift()
        const everything = args.join('')
        const user = await wykop.request('Profile', 'Index', { params: [ everything ] })
        const embed = {
          title: user.about,
          author: {
            name: user.login + ' ' +  emoji[user.author_sex],
            url: user.url,
            icon_url: user.avatar
          },
          description: `Wykopał ${user.diggs} postów, \nDołączył do wykopu: ${user.signup_date}, \nNumer w rankingu: ${user.rank}`, 
          color: col[user.author_group],
          footer: {
            icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
            text: 'Wykoparka by Kiritito, Mickson & takidelfin'
          },
          fields: [
            {
              name: 'Obserwowany przez',
              value: `${user.followers} osób`,
              inline: true
            },
            {
              name: 'Obserwuje',
              value: `${user.following} osób`,
              inline: true
            }
          ]
        }
        await message.channel.send({ embed })
      } catch (err) {
        const embed = {
          title: 'Error',
          color: 16711680,
          description: 'Taki użytkownik nie istnieje lub nie poprawnie wpisałeś jego nick.',
          'image': {
            'url': 'https://i.imgur.com/0gW0Nay.png'
          },
        }
        await message.channel.send({ embed })
      }
    }

    if (args[0] === 'tag') {
      try {
        args.shift()
        const everything = args.join('')
        const tag = await wykop.request('Tag', 'Entries', { params: [ everything ] })
        let i = 0
        for (; i < 5; i += 1) {
          const entry = tag.items[i]
          const img = entry.embed ? entry.embed.preview : null
          const embed = { 
            color: col[entry.author_group],
            description: turndownService.turndown(entry.body) + '\n \n' +  turndownService.turndown(`<a href="${entry.url}">Link do wpisu</a>`),
            author: {
              name: entry.author  + ' ' +  emoji[entry.author_sex],
              url: `https://wykop.pl/ludzie/${entry.author}`,
              icon_url: entry.author_avatar_lo
            },
            'image': { 
              'url': img
            }, 
            footer: {
              icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
              text: 'Wykoparka by Kiritito, Mickson & takidelfin'
            },
            fields: [
              {
                name: `${client.emojis.find('name', 'plus')} Splusowane przez`,
                value: `${entry.vote_count} osób`,
                inline: true
              },
              {
                name: '💬 Skomentowane przez',
                value: `${entry.comment_count} osób`,
                inline: true
              }
            ]
          }
          await message.channel.send({ embed })
          
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (command === 'donate') {
      const embed = {
        title: 'Donate us by PayPal',
        'author': {
          'name': 'Paypal.me',
          'url': 'https://www.paypal.me',
          'icon_url': 'https://i.imgur.com/CxxgcQH.png'
        },
        description: turndownService.turndown('<a href="https://www.paypal.me/kiritito">Donate Link</a>'),
        color:  151511,
        footer: {
          icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
          text: 'Wykoparka by Kiritito, Mickson & takidelfin'
        }
      }
      await message.channel.send({ embed })
    }


    if (command === 'pomoc') {
      try {
        const embed = {
          title: 'Komendy wykoparki:',
          color: 0xF44336,
          description: `
        - wykop główna [Liczba postów] (Domyślnie pobiera 10 postów) 
- wykop ping  (Twój ping)
- wykop mirko [Liczba postów] (Domyślnie pobiera wszystkie z ostatnich 6 godzin)
- wykop tag [Nazwa taga bez #] (Pobiera pięć najnowszych wpisów z danego tagu)
- wykop zaproszenie (Bot generuje zaproszenie dzięki któremu możesz zaprosić go na swój serwer)
- wykop znajdź [Nazwa użytkownika] (Bot zwraca informacje o użytkowniku)
- wykop donate (Opcjonalnie jeśli chcesz wspomóc twórców bota w opłatach za hosting)
       `,
          footer: {
            icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png',
            text: 'Wykoparka by Kiritito, Mickson & takidelfin'
          }
        }
        await message.channel.send({ embed })
      } catch (err) {
        console.log(err)
      }
    }

    if (command === 'ping') {
      const ping = client.ping 
      message.reply('Twój ping:  ``' + Round(ping, 0) + ' ms``') 
    }
  }
})
