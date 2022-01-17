const { SlashCommandBuilder } = require('@discordjs/builders');
const runScoreList = require('./score/scoreList');
const runScoreImage = require('./score/scoreImage');
const runScoreDelete = require('./score/scoreDelete');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('score')
    .setDescription('All commands related to scores.')
    // Score delete
    .addSubcommand((subcommand) =>
      subcommand
        .setName('delete')
        .setDescription('Deletes the given score.')
        .addStringOption((option) =>
          option.setName('score-id').setDescription('The id of the score').setRequired(true),
        ),
    )
    // Score image
    .addSubcommand((subcommand) =>
      subcommand
        .setName('image')
        .setDescription('Get the image of a score.')
        .addStringOption((option) =>
          option.setName('score-id').setDescription('The id of the score').setRequired(true),
        ),
    )
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
      case 'image':
        runScoreImage(interaction);
        break;
      case 'delete':
        runScoreDelete(interaction);
        break;
    }
  },
};
