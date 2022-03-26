const cron = require('cron');
const { DateTime } = require('luxon');
const { guildId, hallOfFameChannelId, announceGameChannelId } = require('../config.json');

const testCron = '*/5 * * * * *'; // Every 5 seconds (for testing)
const productionCron = '0 0 0 * * *'; // Every midnight

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Schedule a message when the next game becomes active
    const scheduledMessage = new cron.CronJob(productionCron, () => {
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
        .catch((error) => {
          if (error?.response?.status === 404) {
            console.log('[Cron] There is no active game.');
          } else {
            console.log('ready error:', error);
            console.log('[Cron] Something went wrong when executing the CronJob');
          }
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
  Promise.all([client.gameService.getGame(previousGameId), client.scoreService.getRanking(previousGameId)])
    .then(([previousGameResponse, previousHighScoresResponse]) => [
      previousGameResponse.data,
      previousHighScoresResponse.data,
    ])
    .then(([game, highScores]) => {
      const guild = client.guilds.cache.get(guildId);
      const channel = guild.channels.cache.get(hallOfFameChannelId);

      if (highScores.size === 0) {
        channel.send(`${game.name} has ended without any posted scores.`);
      }

      const topScore = highScores[0];

      channel.send(
        `Congratulations to <@${topScore.userId}> for winning the **${game.name}** competition with a score of **${topScore.score}!**`,
      );
    })
    .catch(() => console.log('Something went wrong while fetching the previous game and/or high score'));
}
