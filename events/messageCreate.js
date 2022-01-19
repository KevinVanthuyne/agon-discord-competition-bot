const { MessagePayload } = require('discord.js');
const scoredCommandPattern = /^!scored (\d+)$/;

/**
 * messageCreate processes the !scored command in order to be able to get the attached image.
 */
module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const match = scoredCommandPattern.exec(message.content);

    // TODO add `|| message.attachments.length < 1`, now ignoring images for testing
    if (!match) return;

    // const scoreImageUrl = message.attachments.first().url;
    const points = match[1];

    const activeGame = (await message.client.gameService.getActiveGame()).data;

    if (activeGame.id < 0) {
      message.reply({
        content: 'There is no active game at the moment for which you can post a score.',
        ephemeral: true,
      });
      return;
    }

    // TODO score can only be better than personal best

    await message.client.scoreService
      .addScore({
        points,
        // scoreImageUrl,
        scoreImageUrl: '',
        userId: message.author.id,
        username: message.author.username,
      })
      .then((response) => {
        const scoreDelta = response.data.scoreDelta;
        const scoreDeltaString = scoreDelta >= 0 ? `+${scoreDelta.toLocaleString()}` : scoreDelta.toLocaleString();
        const dto = response.data;
        const payload = new MessagePayload(message, {
          content: `<@${dto.score.userId}> posted a new **${
            dto.game.name
          }** score!\n**Score:** ${dto.score.points.toLocaleString()} (${scoreDeltaString} from personal best)\n**Rank:** ${
            dto.rank
          } of ${dto.amountOfHighScores}`,
          // files: [response.data.score.scoreImageUrl],
        });
        message.reply(payload).then(() => message.delete());
      })
      .catch((error) => {
        console.log(error);
        message.reply({ content: 'Something went wrong, could not post score 😢', ephemeral: true });
      });
  },
};
