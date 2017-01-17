const Request = require('request'),
      TokenManager = require('./src/token-manager'),
      Discord = require('discord.js')

let burgbot = new Discord.Client(),
    tm = new TokenManager()


burgbot.on('ready', () => {
    console.log('my name is the burg and i am here to destroy u')
}).on('message', (message) => {
    if(message.content.indexOf('/burg') === 0) {
        
        let burgCount = message.content.split(' ').slice(1),
            url = 'http://hackmiester.com/apps/burg/api.php'

        if(isNaN(parseInt(burgCount)) && burgCount.length > 0)
            return message.channel.sendMessage('Yo yo yoroshiku, you think you\'re clever? That wasn\'t a number.')
        else if (burgCount.length !== 0)
            url += '?length=' + parseInt(burgCount[0])

        return Request.get({
            url: url
        }, (error, response, body) => {
            if(error) message.channel.sendMessage(error)
            else {
                message.channel.sendMessage(body)
                    .catch(console.log);
            }
        })
    }
})

tm.parseTokens().then(() => {
    burgbot.login(tm.tokens.discord)
})

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack)
})