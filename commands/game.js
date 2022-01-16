const { SlashCommandBuilder } = require('@discordjs/builders');
const runGameActiveCommand = require('./game/gameActive');
const runGameAddCommand = require('./game/gameAdd');
const runGameListCommand = require('./game/gameList');
const runGameEditCommand = require('./game/gameEdit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('All commands related to games.')
    // Game active
    .addSubcommand((subcommand) => subcommand.setName('active').setDescription('Show the current active game.'))
    // Game add
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add a new games to the competition.')
        .addStringOption((option) => option.setName('name').setRequired(true).setDescription('Name of the game')),
    )
    // Game edit
    .addSubcommand((subcommand) =>
      subcommand
        .setName('edit')
        .setDescription('Edit a game.')
        .addNumberOption((option) => option.setName('id').setRequired(true).setDescription('Id of the game'))
        .addStringOption((option) =>
          option.setName('new-name').setRequired(false).setDescription('New name of the game'),
        ),
    )
    // Game list
    .addSubcommand((subcommand) => subcommand.setName('list').setDescription('List all games of the competition.')),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    switch (interaction.options.getSubcommand()) {
      case 'list':
        runGameListCommand(interaction);
        break;
      case 'add':
        runGameAddCommand(interaction);
        break;
      case 'edit':
        runGameEditCommand(interaction);
        break;
      case 'active':
        runGameActiveCommand(interaction);
        break;
    }
  },
};
