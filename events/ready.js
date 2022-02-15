const cron = require('cron');
const { guildId, hallOfFameChannelId } = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Schedule a message when the next game becomes active
    const scheduledMessage = new cron.CronJob('*/5 * * * * *', () => {
      const guild = client.guilds.cache.get(guildId);
      const channel = guild.channels.cache.get(hallOfFameChannelId);
      channel.send('Cron test');
    });

    scheduledMessage.start();
  },
};
