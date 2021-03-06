const Table = require('text-table');

module.exports = async function execute(interaction) {
  await interaction.client.gameService
    .getGames()
    .then((response) => {
      const tableData = [
        ['Id', 'Game', 'Start'],
        ['----', '----', '----'],
        ...response.data.map((game) => [game.id, game.name, game.startDate || '']),
      ];
      const table = Table(tableData);
      const content = `**Games**\n\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      console.log('game list error:', error);
      interaction.reply({
        content: 'An error occurred.',
        ephemeral: true,
      });
    });
};
