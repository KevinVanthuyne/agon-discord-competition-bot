const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scored-leaderboard')
    .setDescription('Show all scores and users on the leaderboard...'),
  async execute(interaction) {
    console.log('Interaction', interaction);

    if (!interaction) return;

    await interaction.client.scoreService
      .getRanking(1) // TODO fetch current game
      .then((res) => {
        console.log(res.data);

        const tableData = res.data.map((highScore) => [
          highScore.rank.toString(),
          highScore.username,
          highScore.score.toLocaleString(),
        ]);
        console.log(tableData);
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
