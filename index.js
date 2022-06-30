const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Logger = require('./tools/logger');
const { version } = require('./package.json');
const logger = new Logger();

const client = new Client({
    disableMentions: 'everyone',
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});


const config = {
    prefix: '?',
    owners: ["801274145119404033", "547923574833545226"],

    // The directory where the bot will save the logs.

    logDirectory: 'logs',

}


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.clear();
    logger.debug(`Logged in as ${client.user.tag}!`);
    logger.debug(`Version ${version}`);

    for (const guild of client.guilds.cache.values()) {
        logger.debug(`Joined guild: ${guild.name}`);
    }

    client.user.setActivity(`${config.prefix}help || V${version}`, { type: 'LISTENING' });

    for (const command of client.commands.values()) {
        logger.debug(`Loaded command: ${command.name}`);
    }
});



client.on("messageCreate", async (message) => {

    if (message.author.bot) {
        return;
    }
else {
        const channel = message.channel.id;
        const date = new Date();
        // Make sure the TIME is set to EST.
        const time = date.toLocaleString('en-US', { timeZone: 'America/New_York' });

        const id = message.author.id;
        const filePath = path.join(config.logDirectory, message.author.username + ".log");
        const file = await promisify(fs.open)(filePath, 'a');
        await promisify(fs.writeFile)(file, `[ ${time} ] ${message.author.username} [${id}] ${message.content} {${channel}}\n`);
    }

    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    try {
        const channel = message.channel.id;
        const date = new Date();
        // Make sure the TIME is set to EST.
        const time = date.toLocaleString('en-US', { timeZone: 'America/New_York' });
        client.commands.get(command).execute(message, args, client);
        const id = message.author.id;
        const filePath = path.join(config.logDirectory, id + ".log");
         const file = await promisify(fs.open)(filePath, 'a');
        await promisify(fs.writeFile)(file, `[ ${time} ] ${message.author.username} [${id}]: ${message.content} ${args} {${channel}}\n`);


    }
    catch (error) {
        logger.error(error);
    }
})
const keepAlive = require('./tools/server.js');

keepAlive();

client.login(process.env.token);

