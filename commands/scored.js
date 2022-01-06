const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scored')
    .setDescription('Post a score.')
    .addNumberOption((option) => option.setName('score').setDescription('The score you achieved').setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const score = interaction.options.getNumber('score');
    await interaction.reply(`<@${userId}> posted a new score of ${score}!`);
  },
};
