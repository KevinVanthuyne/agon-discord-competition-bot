const Table = require('text-table');

module.exports = async function execute(interaction) {
  const gameId = interaction.options.getNumber('game-id');
  const userId = interaction.options.getString('user-id');

  if (userId && gameId) {
    await listScoresOfUserForGame(interaction, gameId, userId);
  } else if (userId) {
    await listScoresOfUser(interaction, userId);
  } else if (gameId) {
    await listScoresForGame(interaction, gameId);
  } else {
    const activeGame = (await interaction.client.gameService.getActiveGame()).data;
    if (activeGame.id < 0) {
      interaction.reply({
        content: 'There is no active game at the moment for which to list scores.',
        ephemeral: true,
      });
      return;
    }
    await listScoresForGame(interaction, activeGame.id);
  }
};

async function listScoresForGame(interaction, gameId) {
  interaction.client.scoreService
    .getScoresForGame(gameId)
    .then((response) => {
      if (response.data.length === 0) {
        interaction.reply({
          content: 'No scores posted yet.',
          ephemeral: true,
        });
        return;
      }
      const tableData = [
        ['Id', 'Timestamp', 'User', 'User id', 'Score'],
        ['----', '----', '----', '----', '----'],
        ...response.data.map((score) => [
          score.id,
          score.timestamp,
          score.username,
          score.userId,
          score.points.toLocaleString(),
        ]),
      ];
      const table = Table(tableData);
      const content = `**Scores for game ${response.data[0].gameId}**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        interaction.reply({
          content: `Could not find game with id ${gameId}.`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'An error occured',
          ephemeral: true,
        });
      }
    });
}

async function listScoresOfUser(interaction, userId) {
  interaction.client.scoreService
    .getScoresOfUser(userId)
    .then((response) => {
      if (response.data.length === 0) {
        interaction.reply({
          content: 'No scores posted yet.',
          ephemeral: true,
        });
        return;
      }
      const tableData = [
        ['Id', 'Game id', 'Timestamp', 'Score'],
        ['----', '----', '----', '----'],
        ...response.data.map((score) => [score.id, score.gameId, score.timestamp, score.points.toLocaleString()]),
      ];
      const table = Table(tableData);
      const content = `**Scores for user ${response.data[0].username}**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        interaction.reply({
          content: `Could not find user with id ${userId}.`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'An error occured',
          ephemeral: true,
        });
      }
    });
}

async function listScoresOfUserForGame(interaction, gameId, userId) {
  interaction.client.scoreService
    .getScoresForGameOfUser(gameId, userId)
    .then((response) => {
      if (response.data.length === 0) {
        interaction.reply({
          content: 'No scores posted yet.',
          ephemeral: true,
        });
        return;
      }
      const tableData = [
        ['Id', 'Timestamp', 'Score'],
        ['----', '----', '----'],
        ...response.data.map((score) => [score.id, score.timestamp, score.points.toLocaleString()]),
      ];
      const table = Table(tableData);
      const content = `**Scores of ${response.data[0].username} for game ${response.data[0].gameId}**\`\`\`${table}\`\`\``;

      interaction.reply({
        content,
        ephemeral: true,
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        interaction.reply({
          content: `Could not find game ${gameId} and or user ${userId}.`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'An error occured',
          ephemeral: true,
        });
      }
    });
}
