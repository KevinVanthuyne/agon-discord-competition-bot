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
        if (error.response.status === 400) {
          message.reply({
            content: 'You can only post scores better than your personal best.',
            ephemeral: true,
          });
        } else if (error.response.status === 404) {
          message.reply({
            content: 'There is no active game at the moment for which you can post a score.',
            ephemeral: true,
          });
        } else {
          console.log('message create error:', error);
          message.reply({
            content: 'An error occured',
            ephemeral: true,
          });
        }
      });
  },
};
