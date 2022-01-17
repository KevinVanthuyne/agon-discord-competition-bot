module.exports = async function execute(interaction) {
  const scoreId = interaction.options.getString('score-id');

  await interaction.client.scoreService.getScore({ id: scoreId }).then((response) => {
    interaction.reply({
      content: `${response.data.scoreImageUrl}`,
      ephemeral: true,
    });
  });
};
