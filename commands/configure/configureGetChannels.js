const Table = require('text-table');

module.exports = async function execute(interaction) {
  await interaction.client.settingsService
    .getAllChannels()
    .then((channels) => {
      const data = Object.entries(channels).map((entry) => [entry[0], entry[1]?.value || '']);
      const tableData = [['Channel', 'Channel Id'], ['----', '----'], ...data];
      const table = Table(tableData);
      const content = `**Channel Configuration**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      console.log('Channel set error:', error);
      interaction.reply({
        content: 'An error occurred.',
        ephemeral: true,
      });
    });
};
