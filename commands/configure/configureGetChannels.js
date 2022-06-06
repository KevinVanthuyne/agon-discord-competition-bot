const Table = require('text-table');

module.exports = async function execute(interaction) {
  await interaction.client.settingsService
    .fetchAllChannels()
    .then(() => {
      const tableData = [
        ['Channel', 'Channel Id'],
        ['----', '----'],
        ['Scoring', interaction.client.settingsService.scoringChannelId || ''],
        ['Hall of Fame', interaction.client.settingsService.hallOfFameChannelId || ''],
        ['Winner', interaction.client.settingsService.winnerChannelId || ''],
      ];
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
