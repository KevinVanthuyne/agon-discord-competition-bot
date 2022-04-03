const Table = require('text-table');

module.exports = async function execute(interaction) {
  const gameId = interaction.options.getNumber('game-id');

  await interaction.client.gameStyleService
    .getGameStyle({ gameId })
    .then((response) => {
      const gameStyle = response.data;
      const tableData = [
        ['Game id', 'Background image', 'Background color', 'Header image', 'Border color', 'Font color'],
        ['----', '----', '----', '----', '----', '----'],
        [
          gameStyle.gameId,
          gameStyle.backgroundImage || '',
          gameStyle.backgroundColor || '',
          gameStyle.headerImage || '',
          gameStyle.borderColor || '',
          gameStyle.fontColor || '',
        ],
      ];
      const table = Table(tableData);
      const content = `**Game Styles**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      console.log('game style list error:', error);
      interaction.reply({
        content: 'An error occurred.',
        ephemeral: true,
      });
    });
};
