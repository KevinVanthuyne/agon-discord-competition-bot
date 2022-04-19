const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Explains how to interact with the Argon Competition Bot.'),
  async execute(interaction) {
    await interaction.reply({
      content: `The following commands are available for regular users:

\`!scored <score>\` 
Post a new highscore for the current active game. This score can only be higher than your previous best. 
❗ Make sure to attach an image that proves your score.

\`/leaderboard\`
Shows all highscores and who achieved them for the current game, ranked from the highest score to the lowest.

\`/delete-personal-best\`
Delete your current best scores. Useful if you posted an incorrect score.

\`/initials <XXX>\`
Set your 3-letter initials if you want other people to know what initials you use when you achieve a highscore.

\`/help\`
Shows this message.
        `,
      ephemeral: true,
    });
  },
};
