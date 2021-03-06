const Table = require('text-table');

module.exports = async function execute(interaction) {
  await interaction.client.gameService
    .getActiveGame()
    .then((response) => {
      const tableData = [
        ['Id', 'Game', 'Start'],
        ['----', '----', '----'],
        [response.data.id, response.data.name, response.data.startDate],
      ];
      const table = Table(tableData);
      const content = `**Active game**\n\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        interaction.reply({
          content: 'No game is active currently.',
          ephemeral: true,
        });
      } else {
        console.log('game active error:', error);
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      }
    });
};
