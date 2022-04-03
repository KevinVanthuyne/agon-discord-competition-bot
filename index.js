require('dotenv').config();

const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const ScoreService = require('./services/scoreService');
const GameService = require('./services/gameService');
const CompetitionService = require('./services/competitionService');
const UserService = require('./services/userService');
const GameStyleService = require('./services/gameStyleService');

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
client.scoreService = new ScoreService();
client.gameService = new GameService();
client.competitionService = new CompetitionService();
client.userService = new UserService();
client.gameStyleService = new GameStyleService();

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
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('\nStarted refreshing application (/) commands.');

    let routeRegistrationRoute;
    if (process.env.NODE_ENV === 'production') {
      console.log('Registering commands as global commands, used in production.');
      routeRegistrationRoute = Routes.applicationCommands(process.env.CLIENT_ID);
    } else {
      console.log('Registering commands as guild commands, used in development for instant updating.');
      routeRegistrationRoute = Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID);
    }

    await rest.put(routeRegistrationRoute, { body: commands });
    console.log('Successfully reloaded application (/) commands.\n');
  } catch (error) {
    console.error(error);
  }
})();

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
