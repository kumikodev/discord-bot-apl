const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ben",
    description: "Ask the One and Only BEN a Question.",
    execute(message, args) {
        if (args.length == 0) {
            message.channel.send("Please ask a 3 or more word question!");
            console.log("bot.error.noquestion")
        }
        else {
            const answers = ["yes", "no", "HoHoHo", "Blahh"]
            const answer = answers[Math.floor(Math.random() * answers.length)];
            const embed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Ben • ${message.author.username}`)
                .setDescription(`${message.author.username} asked: ${args.join(" ")}`)
                .addField("Answer", answer)
                .setAuthor({ name: `Apple Bot V2 • ${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` }) 


            message.reply({ embeds: [embed] });
        }
    },
};