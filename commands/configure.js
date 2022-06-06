const { SlashCommandBuilder } = require('@discordjs/builders');
const runConfigureChannel = require('./configure/configureChannel');
const runConfigureGetChannels = require('./configure/configureGetChannels');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('configure')
    .setDescription('Commands for configuring admin stuff.')
    // Configure channel
    .addSubcommand((subcommand) =>
      subcommand
        .setName('channel')
        .setDescription('Configure what channels are used by the bot.')
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('What channel to configure')
            .setRequired(true)
            .addChoices([
              ['Hall of fame', 'hall-of-fame'],
              ['Score posting', 'scoring'],
              ['Winner announcement', 'winner'],
            ]),
        )
        .addStringOption((option) =>
          option.setName('channel-id').setDescription('The id of the channel.').setRequired(true),
        ),
    )
    // Get all configured channels
    .addSubcommand((subcommand) =>
      subcommand.setName('get-channels').setDescription('See what channels are configured'),
    ),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    switch (interaction.options.getSubcommand()) {
      case 'channel':
        runConfigureChannel(interaction);
        break;
      case 'get-channels':
        runConfigureGetChannels(interaction);
        break;
    }
  },
};
