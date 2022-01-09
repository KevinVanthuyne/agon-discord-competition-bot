const { MessagePayload } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (!message.content.startsWith('!scored ')) return;

    if (message.attachments.length < 1) return;

    const imgUrl = message.attachments.first().url;

    const payload = new MessagePayload(message, {
      content: `<@${message.author.id}> posted a new score!`,
      files: [imgUrl],
    });

    await message.reply(payload);
  },
};
