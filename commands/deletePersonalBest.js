const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete-personal-best')
    .setDescription(
      'Delete your current personal best score of the active game, falls back to your previous best score.',
    ),
  async execute(interaction) {
    await interaction.client.scoreService
      .getPersonalBest(interaction.user.id)
      .then((response) => response.data)
      .then((personalBest) => interaction.client.scoreService.deleteScore(personalBest.id))
      .then((response) => response.data)
      .then((score) => {
        interaction.reply({
          content: `Your personal best score of ${score.points.toLocaleString()} was deleted.`,
          ephemeral: true,
        });
      })
      .catch(() => {
        interaction.reply({
          content: 'An error occurred. There might not be an active game or you did not post any scores yet.',
          ephemeral: true,
        });
      });
  },
};
