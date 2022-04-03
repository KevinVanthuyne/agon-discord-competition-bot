/* eslint-disable quotes */
const { SlashCommandBuilder } = require('@discordjs/builders');
const runGameStyleGetCommand = require('./gameStyle/gameStyleGet');
const runGameStyleEditCommand = require('./gameStyle/gameStyleEdit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-style')
    .setDescription('All commands related to game styles.')
    // Game style get
    .addSubcommand((subcommand) =>
      subcommand
        .setName('get')
        .setDescription('Get a single game style')
        .addNumberOption((option) =>
          option.setName('game-id').setRequired(true).setDescription('The game for which to retrieve the style'),
        ),
    )
    // Game style edit
    .addSubcommand((subcommand) =>
      subcommand
        .setName('edit')
        .setDescription('Edit a game style.')
        .addNumberOption((option) =>
          option.setName('game-id').setRequired(true).setDescription('Id of the game to edit style of'),
        )
        .addStringOption((option) =>
          option
            .setName('background-image')
            .setRequired(false)
            .setDescription("The background image of the game's column"),
        )
        .addStringOption((option) =>
          option
            .setName('background-color')
            .setRequired(false)
            .setDescription("The background color of the game's column (fallback if there's no image given)"),
        )
        .addStringOption((option) =>
          option.setName('header-image').setRequired(false).setDescription("The header image of the game's column"),
        )
        .addStringOption((option) =>
          option
            .setName('border-color')
            .setRequired(false)
            .setDescription('The color of the border of the score blocks'),
        )
        .addStringOption((option) =>
          option
            .setName('font-color')
            .setRequired(false)
            .setDescription('The color of the usernames in the score blocks'),
        ),
    ),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    switch (interaction.options.getSubcommand()) {
      case 'get':
        runGameStyleGetCommand(interaction);
        break;
      case 'edit':
        runGameStyleEditCommand(interaction);
        break;
    }
  },
};
