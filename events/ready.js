const cron = require('cron');
const { DateTime } = require('luxon');
const { guildId, hallOfFameChannelId, announceGameChannelId } = require('../config.json');

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
        .then((activeGame) => {
          const gameStartDate = DateTime.fromISO(activeGame.startDate);
          if (!DateTime.now().hasSame(gameStartDate, 'day')) {
            console.log('[Cron] Game start date did not match current date, skipping.');
            return;
          }
          console.log('[Cron] Game start date matches today, posting new game and winner.');

          // Active game is the game that just reached its start date
          announceNextGame(client, activeGame);
          postWinner(client, activeGame);
        })
        .catch(() => {
          console.log('Something went wrong when executing the CronJob');
        });
    });

    scheduledMessage.start();
  },
};

function announceNextGame(client, activeGame) {
  const guild = client.guilds.cache.get(guildId);
  const channel = guild.channels.cache.get(announceGameChannelId);
  channel.send({
    content: `Time for a new game! This month we are playing:\n\n> **${activeGame.name}**\n\nGood luck, and have fun!`,
    files: [{ attachment: activeGame.gameStyle.headerImage }],
  });
}

function postWinner(client, activeGame) {
  const previousGameId = activeGame.id - 1;
  if (previousGameId < 1) {
    console.log('[Cron] There is no previous game to post the winner of.');
    return;
  }
  client.scoreService
    .getRanking(previousGameId)
    .then((response) => response.data)
    .then((highScores) => {
      if (highScores.size === 0) return;

      const topScore = highScores[0];

      const guild = client.guilds.cache.get(guildId);
      const channel = guild.channels.cache.get(hallOfFameChannelId);
      channel.send(`The current game has ended. Congratulations to ${topScore.username} for winning!`);
    })
    .catch(() => console.log('Could not fetch the previous game.'));
}
