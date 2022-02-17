const cron = require('cron');
const { DateTime } = require('luxon');
const { guildId, hallOfFameChannelId } = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Schedule a message when the next game becomes active
    // Every 5 seconds (for testing)
    const scheduledMessage = new cron.CronJob('*/5 * * * * *', () => {
      // Every midnight
      // const scheduledMessage = new cron.CronJob('0 0 0 * * *', () => {
      console.log('[Cron] Running the scheduled job.');
      client.gameService
        .getActiveGame()
        .then((response) => response.data)
        .then((game) => {
          const gameStartDate = DateTime.fromISO(game.startDate);
          if (!DateTime.now().hasSame(gameStartDate, 'day')) {
            console.log('[Cron] Game start date did not match current date, skipping.');
            return;
          }
          console.log('[Cron] Game start date matches today, posting new game.');
          const guild = client.guilds.cache.get(guildId);
          const channel = guild.channels.cache.get(hallOfFameChannelId);
          channel.send(`Time for a new game: **${game.name}**!`);
        })
        .catch((e) => {
          console.log('Something went wrong when executing the CronJob', e);
        });
    });

    scheduledMessage.start();
  },
};
