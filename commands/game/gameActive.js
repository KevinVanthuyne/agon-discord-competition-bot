const Table = require('text-table');

module.exports = async function execute(interaction) {
  await interaction.client.gameService.getActiveGame().then((response) => {
    if (response.data.id < 0) {
      interaction.reply({
        content: 'No game is active currently.',
        ephemeral: true,
      });
      return;
    }

    const tableData = [
      ['Id', 'Game', 'Start'],
      ['----', '----', '----'],
      [response.data.id, response.data.name, response.data.startDate],
    ];
    const table = Table(tableData);
    const content = `**Active game**\`\`\`${table}\`\`\``;

    interaction.reply({
      content,
      ephemeral: true,
    });
  });
};
