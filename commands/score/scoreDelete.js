module.exports = async function execute(interaction) {
  const scoreId = interaction.options.getString('score-id');
  await interaction.client.scoreService
    .deleteScore(scoreId)
    .then((response) => {
      interaction.reply({
        content: `Score of **${response.data.points}** points by **${response.data.username}** achieved on ${response.data.timestamp} was deleted.`,
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        interaction.reply({
          content: `Could not find score with id ${scoreId}.`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      }
    });
};
