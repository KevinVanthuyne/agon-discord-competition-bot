module.exports = async function execute(interaction) {
  const id = interaction.options.getNumber('id');

  await interaction.client.gameService
    .deleteGame({ id })
    .then(() => {
      interaction.reply({
        content: 'Game was deleted',
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        interaction.reply({
          content: `Could not find game with id ${id}.`,
          ephemeral: true,
        });
      } else {
        console.log('game delete error:', error);
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      }
    });
};
