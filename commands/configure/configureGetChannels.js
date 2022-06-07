const Table = require('text-table');

module.exports = async function execute(interaction) {
  interaction.client.settingsService.fetchAllChannels();

  const tableData = [
    ['Channel', 'Channel Id'],
    ['----', '----'],
    ['Scoring', interaction.client.settingsService.scoringChannelId || ''],
    ['Hall of Fame', interaction.client.settingsService.hallOfFameChannelId || ''],
    ['Game announcement', interaction.client.settingsService.gameAnnouncementChannelId || ''],
  ];
  const table = Table(tableData);
  const content = `**Channel Configuration**\n\`\`\`${table}\`\`\``;

  interaction.reply({
    content,
    ephemeral: true,
  });
};
