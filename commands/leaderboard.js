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
        const content = `**Leaderboard - ${game.name}**\`\`\`${table}\`\`\``;

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
