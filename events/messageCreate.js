module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (!message.content.startsWith('!scored ')) return;
    console.log(message);
    message.reply(`<@${message.author.id}> posted a new score!`);
  },
};
