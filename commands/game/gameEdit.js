module.exports = async function execute(interaction) {
  const id = interaction.options.getNumber('id');
  const newName = interaction.options.getString('new-name');

  if (!newName) {
    await interaction.reply({ content: 'A new name should be given.', ephemeral: true });
    return;
  }

  await interaction.client.gameService
    .updateGame({ id, newName })
    .then(() => {
      interaction.reply({
        content: 'Game was updated',
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
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      }
    });
};
