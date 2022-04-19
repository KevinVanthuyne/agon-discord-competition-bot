const { MessagePayload } = require('discord.js');
const scoredCommandPattern = /^!scored (\d+)$/;

/**
 * messageCreate processes the !scored command in order to be able to get the attached image.
 */
module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const match = scoredCommandPattern.exec(message.content);

    // Only run if message starts with !scored
    if (!match) return;

    // Only run if the message was posted in the allowed channel
    if (message.channelId !== process.env.SCORES_POST_CHANNEL_ID) return;

    // Only run (in production) if a message is attached
    let scoreImageUrl;
    if (process.env.NODE_ENV === 'production') {
      if (message.attachments.size < 1) {
        message.reply({
          content: 'You have to add an image attachment to prove your score.',
          ephemeral: true,
        });
        return;
      } else {
        scoreImageUrl = message.attachments.first().url;
      }
    }

    const points = match[1];
    await message.client.scoreService
      .addScore({
        points,
        scoreImageUrl,
        userId: message.author.id,
        username: message.author.username,
      })
      .then((response) => {
        const scoreDelta = response.data.scoreDelta;
        const scoreDeltaString = scoreDelta >= 0 ? `+${scoreDelta.toLocaleString()}` : scoreDelta.toLocaleString();
        const dto = response.data;

        const messageOptions = {
          content: `<@${dto.score.userId}> posted a new **${
            dto.game.name
          }** score!\n**Score:** ${dto.score.points.toLocaleString()} (${scoreDeltaString} from personal best)\n**Rank:** ${
            dto.rank
          } of ${dto.amountOfHighScores}`,
        };
        if (scoreImageUrl) {
          messageOptions.files = [response.data.score.scoreImageUrl];
        }

        const payload = new MessagePayload(message, messageOptions);
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
