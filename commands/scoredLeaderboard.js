const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scored-leaderboard')
    .setDescription('Show all scores and users on the leaderboard.'),
  async execute(interaction) {
    await interaction.client.scoreService
      .getRanking(1) // TODO fetch current game
      .then((res) => {
        console.log(res.data);

        let content = '**Leaderboard**';
        res.data.forEach((highScore) => {
          content += `\n${highScore.rank}   ${highScore.username}   ${highScore.score}`;
        });

        interaction.reply({
          content,
          ephemeral: true,
        });
      })
      .catch((error) => console.log(error));
  },
};
