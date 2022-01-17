module.exports = async function execute(interaction) {
  await interaction.client.scoreService.deleteScore(interaction.options.getString('score-id')).then((response) => {
    interaction.reply({
      content: `Score of **${response.data.points}** points by **${response.data.username}** achieved on ${response.data.timestamp} was deleted.`,
      ephemeral: true,
    });
  });
};
