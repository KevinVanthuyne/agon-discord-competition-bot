const { SlashCommandBuilder } = require('@discordjs/builders');
const runGameActiveCommand = require('./game/gameActive');
const runGameAddCommand = require('./game/gameAdd');
const runGameListCommand = require('./game/gameList');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('All commands related to games.')
    .addSubcommand((subcommand) => subcommand.setName('active').setDescription('Show the current active game.'))
    .addSubcommand((subcommand) => subcommand.setName('list').setDescription('List all games of the competition.'))
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add a new games to the competition.')
        .addStringOption((option) => option.setName('name').setRequired(true).setDescription('Name of the game')),
    ),
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
      case 'active':
        runGameActiveCommand(interaction);
        break;
    }
  },
};
