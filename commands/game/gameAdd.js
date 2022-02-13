module.exports = async function execute(interaction) {
  const name = interaction.options.getString('name');

  await interaction.client.gameService
    .addGame({ name })
    .then((response) => {
      interaction.reply({
        content: `Game '${response.data.name}' (id ${response.data.id}) was added to the competition.`,
        ephemeral: true,
      });
    })
    .catch(() => {
      interaction.reply({
        content: 'An error occurred.',
        ephemeral: true,
      });
    });
};
