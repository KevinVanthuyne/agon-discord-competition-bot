const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scored-leaderboard')
    .setDescription('Show all scores and users on the leaderboard.'),
  async execute(interaction) {
    console.log('test');

    await interaction.client.scoreService
      .getScores()
      .then((res) => {
        console.log(res.data);

        interaction.reply({
          content: `
        **Leaderboard**
        `,
          // ${res.data}
          ephemeral: true,
        });
      })
      .catch((error) => console.log(error));
  },
};
