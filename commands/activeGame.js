const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder().setName('active-game').setDescription('Shows the current active game.'),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    await interaction.client.gameService.getActiveGame().then((response) => {
      if (response.data.id < 0) {
        interaction.reply({
          content: 'No game is active currently.',
          ephemeral: true,
        });
        return;
      }

      const tableData = [
        ['Id', 'Game', 'Start'],
        ['----', '----', '----'],
        [response.data.id, response.data.name, response.data.startDate],
      ];
      const table = Table(tableData);
      const content = `**Active game**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    });
  },
};
