module.exports = async function execute(interaction) {
  const scoreId = interaction.options.getString('score-id');

  await interaction.client.scoreService
    .getScore({ id: scoreId })
    .then((response) => {
      interaction.reply({
        content: `${response.data.scoreImageUrl}`,
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
