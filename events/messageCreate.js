const { MessagePayload } = require('discord.js');
const scoredCommandPattern = /^!scored (\d+)$/;

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const match = scoredCommandPattern.exec(message.content);

    if (!match || message.attachments.length < 1) return;

    const imgUrl = message.attachments.first().url;
    const score = match[1];

    const payload = new MessagePayload(message, {
      content: `<@${message.author.id}> posted a new score of ${score}!`,
      files: [imgUrl],
    });

    await message.reply(payload).then(() => message.delete());
  },
};
