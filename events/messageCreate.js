const { MessagePayload } = require('discord.js');
const scoredCommandPattern = /^!scored (\d+)$/;

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const match = scoredCommandPattern.exec(message.content);

    // TODO add `|| message.attachments.length < 1`, now ignoring images for testing
    if (!match) return;

    // const scoreImageUrl = message.attachments.first().url;
    const score = match[1];

    await message.client.scoreService
      .addScore({
        score,
        // scoreImageUrl,
        scoreImageUrl: '',
        userId: message.author.id,
        username: message.author.username,
        gameId: 1,
      })
      .then((response) => {
        console.log(message.author.id);

        console.log(response.data);

        const scoreDelta = response.data.scoreDelta;
        const scoreDeltaString = scoreDelta >= 0 ? `+${scoreDelta.toLocaleString()}` : scoreDelta.toLocaleString();
        const payload = new MessagePayload(message, {
          content: `<@${
            message.author.id
          }> posted a new score of **${response.data.score.score.toLocaleString()}** (${scoreDeltaString} from personal best)!`,
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
