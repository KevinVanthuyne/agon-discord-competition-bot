const { MessagePayload } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (!message.content.startsWith('!scored ')) return;

    console.log(message);

    new MessagePayload(message, {
      content: `<@${message.author.id}> posted a new score!`,
      files: [
        {
          buffer: message.attachment,
        },
      ],
    });
    MessagePayload.create();

    await message.reply(`<@${message.author.id}> posted a new score!`);
  },
};
