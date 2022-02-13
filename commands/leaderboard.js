const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show all scores and users on the leaderboard.'),
  async execute(interaction) {
    await interaction.client.scoreService
      .getCurrentRanking()
      .then((res) => {
        if (res.data.length === 0) {
          return interaction.reply({
            content: 'No scores have been posted yet.',
            ephemeral: true,
          });
        }

        const tableData = [
          ['Rank', 'User', 'Initials', 'Score'],
          ['----', '----', '----', '----'],
          ...res.data.map((highScore) => [
            highScore.rank.toString(),
            highScore.username,
            highScore.initials,
            highScore.score.toLocaleString(),
          ]),
        ];
        const table = Table(tableData);
        const content = `**Leaderboard**\`\`\`${table}\`\`\``;

        interaction.reply({
          content,
          ephemeral: true,
        });
      })
      .catch(() => {
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      });
  },
};
