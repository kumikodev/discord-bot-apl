const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "help",
    description: "Displays all commands.",
    execute(message, args, client) {
        if (args.length === 0) {
        const helpEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Help: Commands")
            
            .setDescription("All commands are prefixed with `?`" + "\n Bot is Hosted By [Kumiko#0001](https://kumiko-dev.tk)")
            .setAuthor({ name: `Apple Bot V2 • ${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` }) 



        const commands = client.commands.map(command => command.name);
        for (const command of commands) {
            helpEmbed.addField(command, client.commands.get(command).description);
        }

        message.channel.send({ embeds: [helpEmbed] });

        }
        else {
            const command = args[0];
            if (client.commands.has(command)) {
                const commandEmbed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`Help: ${command}`)
                    .setDescription(client.commands.get(command).description)
                    .setAuthor({ name: `Apple Bot V2 • ${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` }) 
                message.channel.send({ embeds: [commandEmbed] });
            }
            else {
                message.channel.send("Command not found.");
            }
        }

    },
};