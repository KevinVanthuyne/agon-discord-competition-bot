const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('scored').setDescription('Explains how to post a new score.'),
  async execute(interaction) {
    await interaction.reply({
      content:
        'To post a new score use the following command: `!scored <score>` and make sure to attach an image that proves your score.',
      ephemeral: true,
    });
  },
};
