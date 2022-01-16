const { MessagePayload } = require('discord.js');
const scoredCommandPattern = /^!scored (\d+)$/;

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
        const payload = new MessagePayload(message, {
          content: `<@${response.data.score.userId}> posted a new ${
            response.data.game.name
          } score of **${response.data.score.points.toLocaleString()}** (${scoreDeltaString} from personal best)!`,
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
