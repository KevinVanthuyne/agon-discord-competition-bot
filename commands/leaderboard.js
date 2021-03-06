const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show all scores and users on the leaderboard.'),
  async execute(interaction) {
    await Promise.all([
      interaction.client.gameService.getActiveGame(),
      interaction.client.scoreService.getCurrentRanking(),
    ])
      .then(([gameResponse, highScoresResponse]) => [gameResponse.data, highScoresResponse.data])
      .then(([game, highScores]) => {
        if (highScores.length === 0) {
          return interaction.reply({
            content: 'No scores have been posted yet.',
            ephemeral: true,
          });
        }

        const tableData = [
          ['Rank', 'User', 'Initials', 'Score'],
          ['----', '----', '----', '----'],
          ...highScores.map((highScore) => [
            highScore.rank.toString(),
            highScore.username,
            highScore.initials,
            highScore.score.toLocaleString(),
          ]),
        ];
        const table = Table(tableData);
        const content = `**Leaderboard - ${game.name}**\n\`\`\`${table}\`\`\``;

        interaction.reply({
          content,
          ephemeral: true,
        });
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          interaction.reply({
            content: 'No active game to show leaderboard for.',
            ephemeral: true,
          });
        } else {
          console.log('leaderboard error:', error);
          interaction.reply({
            content: 'An error occurred.',
            ephemeral: true,
          });
        }
      });
  },
};
