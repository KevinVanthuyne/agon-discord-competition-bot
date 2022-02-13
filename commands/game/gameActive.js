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
      const content = `**Active game**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 404) {
        interaction.reply({
          content: 'No game is active currently.',
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'An error occured',
          ephemeral: true,
        });
      }
    });
};
