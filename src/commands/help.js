const embed = require('../utils/errorEmbed')

async function help (message) {
  try {
    const embed = {
      title: `Komendy wykoparki:`,
      author: {
        name: 'Wykoparka',
        url: `https://github.com/SerekKiri/Wykoparka`,
        icon_url: 'https://cdn.discordapp.com/attachments/459094812914614273/459433124003315740/wykoparka.png'
      },
      description: `
**Prefix: wykop**\n
- wykop główna [Liczba postów] (Domyślnie pobiera 10 postów)
- wykop mirko [Liczba postów] (Domyślnie pobiera wszystkie z ostatnich 6 godzin)
- wykop tag [Nazwa taga bez #] (Pobiera pięć najnowszych wpisów z danego tagu)
- wykop zaproszenie (Bot generuje zaproszenie dzięki któremu możesz zaprosić go na swój serwer)
- wykop znajdź [Nazwa użytkownika] (Bot zwraca informacje o użytkowniku)
- wykop github (Tutaj znajdziesz kod wykoparki)
- wykop donate (Opcjonalnie jeśli chcesz wspomóc twórców bota w opłatach za hosting)`,
      timestamp: new Date(),
      color: 0xF44336,
      fields: [
        {
          name: `Emoji oznaczające płeć:`,
          value: `Facet: 👨\nKobieta: 👩\nNie określona: 👽`,
          inline: true
        }
      ],
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

module.exports = help
