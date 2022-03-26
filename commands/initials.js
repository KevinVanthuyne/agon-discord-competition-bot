const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('initials')
    .setDescription('Sets the initials you use when achieving highscores.')
    .addStringOption((option) => option.setName('initials').setRequired(true).setDescription('Your initials')),
  async execute(interaction) {
    await interaction.client.userService
      .updateUser({
        id: interaction.user.id,
        name: interaction.user.username,
        initials: interaction.options.getString('initials'),
      })
      .then((response) => {
        interaction.reply({
          content: `Your initials were set to ${response.data.initials}.`,
          ephemeral: true,
        });
      })
      .catch((error) => {
        console.log('initials error:', error);
        interaction.reply({
          content: 'An error occurred.',
          ephemeral: true,
        });
      });
  },
};
