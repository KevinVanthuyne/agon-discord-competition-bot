module.exports = async function execute(interaction) {
  const gameId = interaction.options.getNumber('game-id');
  const backgroundImage = interaction.options.getString('background-image');
  const backgroundColor = interaction.options.getString('background-color');
  const headerImage = interaction.options.getString('header-image');
  const borderColor = interaction.options.getString('border-color');
  const fontColor = interaction.options.getString('font-color');

  await interaction.client.gameStyleService
    .updateGameStyle({ gameId, backgroundImage, backgroundColor, headerImage, borderColor, fontColor })
    .then(() => {
      interaction.reply({
        content: 'Game style was updated',
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        interaction.reply({
          content: `Could not find game with id ${gameId}.`,
          ephemeral: true,
        });
      } else {
        console.log('game style edit error:', error);
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      }
    });
};
