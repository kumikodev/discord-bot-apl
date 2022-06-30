const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "uptime",
    description: "Pings the bot.",
    execute(message, args, client) {
        const pingEmbed = new MessageEmbed()

            .setColor("#0099ff")
            .setTitle("Pong!")
            .setAuthor({ name: `Apple Bot V2 • ${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` }) 
            .setDescription(`${Math.round(client.ws.ping)}ms`)

        message.reply({ embeds: [pingEmbed] });

    },
};