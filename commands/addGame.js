const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-game')
    .setDescription('Adds a new game to the competition.')
    .addStringOption((option) => option.setName('name').setRequired(true).setDescription('Name of the game')),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    const name = interaction.options.getString('name');

    await interaction.client.gameService.addGame({ name }).then((response) => {
      interaction.reply({
        content: `Game '${response.data.name}' (id ${response.data.id}) was added to the competition.`,
        ephemeral: true,
      });
    });
  },
};