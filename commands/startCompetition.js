const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start-competition')
    .setDescription('Set a date on which to start the competition.')
    .addStringOption((option) => option.setName('date').setRequired(true).setDescription('YYYY-MM-DD')),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    await interaction.client.competitionService
      .startCompetition({ startDate: interaction.options.getString('date') })
      .then((response) => {
        interaction.reply({
          content: `Competition will start on ${response.data.startDate}.`,
          ephemeral: true,
        });
      })
      .catch((error) => {
        console.log('start competition error:', error);
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      });
  },
};
