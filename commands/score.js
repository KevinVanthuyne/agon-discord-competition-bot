const { SlashCommandBuilder } = require('@discordjs/builders');
const runScoreList = require('./score/scoreList');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('score')
    .setDescription('All commands related to scores.')
    // Score list
    .addSubcommand((subcommand) =>
      subcommand
        .setName('list')
        .setDescription('Lists all scores of a user, game or user for a game.')
        .addNumberOption((option) => option.setName('game-id').setDescription('The id of the game').setRequired(false))
        .addStringOption((option) => option.setName('user-id').setDescription('The id of the user').setRequired(false)),
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
        runScoreList(interaction);
        break;
    }
  },
};
