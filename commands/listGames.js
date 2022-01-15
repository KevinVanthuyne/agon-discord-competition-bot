const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder().setName('list-games').setDescription('Shows all games in the competition.'),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    await interaction.client.gameService.getGames().then((response) => {
      const tableData = [
        ['Id', 'Game', 'Start'],
        ['----', '----', '----'],
        ...response.data.map((game) => [game.id, game.name, game.startDate]),
      ];
      const table = Table(tableData);
      const content = `**Games**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    });
  },
};
