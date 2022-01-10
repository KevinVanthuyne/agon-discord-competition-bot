const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show all scores and users on the leaderboard.'),
  async execute(interaction) {
    console.log('Interaction', interaction);

    if (!interaction) return;

    await interaction.client.scoreService
      .getRanking(1) // TODO fetch current game
      .then((res) => {
        if (res.data.length === 0) {
          return interaction.reply({
            content: 'No scores have been posted yet.',
            ephemeral: true,
          });
        }

        const tableData = [
          ['Rank', 'User', 'Score'],
          ...res.data.map((highScore) => [
            highScore.rank.toString(),
            highScore.username,
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
      .catch((error) => console.log(error));
  },
};
