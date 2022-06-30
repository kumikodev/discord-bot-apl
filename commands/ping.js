const axios = require('axios');
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "ping",
    description: "Pings a website.",
    execute(message, args) {
        
        const options = {
            method: 'POST',
            url: 'https://simple-ping.p.rapidapi.com/',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '596c6a5b11msh723670400ddcc85p1e43f4jsn74a295ba60db',
              'X-RapidAPI-Host': 'simple-ping.p.rapidapi.com'
            },
            data: `{"host": "${args[0]}"}`
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              const pingEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Pong!")
                .setDescription(`Status: ${response.data.status}`)
                .setAuthor({ name: `Apple Bot V2 • ${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` }) 
            message.channel.send({ embeds: [pingEmbed] });
          }).catch(function (error) {
              console.error(error);
          });
    },
};