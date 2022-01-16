const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');
const ScoreService = require('./services/scoreService');
const GameService = require('./services/gameService');
const CompetitionService = require('./services/competitionService');

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
client.scoreService = new ScoreService();
client.gameService = new GameService();
client.competitionService = new CompetitionService();

// Load all commands
console.log('\n--- Loading commands:');

const commands = [];
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(command.data.name);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Load all events
console.log('\n--- Loading events:');

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  console.log(event.name);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Re-register commands
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('\nStarted refreshing application (/) commands.');
    await rest.put(
      // Routes.applicationCommands(clientId), // Register as global command, used for production
      Routes.applicationGuildCommands(clientId, guildId), // Register as guild command for instant updating, used for development
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.\n');
  } catch (error) {
    console.error(error);
  }
})();

// Login to Discord with your client's token
client.login(token);
