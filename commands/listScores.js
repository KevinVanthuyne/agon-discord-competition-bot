const { SlashCommandBuilder } = require('@discordjs/builders');
const Table = require('text-table');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-scores')
    .setDescription('Lists all scores of a user, game or user for a game.')
    .addNumberOption((option) => option.setName('game-id').setDescription('The id of the game').setRequired(false))
    .addStringOption((option) => option.setName('user-id').setDescription('The id of the user').setRequired(false)),
  async execute(interaction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    const gameId = interaction.options.getNumber('game-id');
    const userId = interaction.options.getString('user-id');

    if (userId && gameId) {
      await listScoresOfUserForGame(interaction, gameId, userId);
    } else if (userId) {
      await listScoresOfUser(interaction, userId);
    } else if (gameId) {
      await listScoresForGame(interaction, gameId);
    } else {
      await interaction.reply({
        content: 'No game and/or user id was given.',
        ephemeral: true,
      });
    }
  },
};

async function listScoresForGame(interaction, gameId) {
  interaction.client.scoreService.getScoresForGame(gameId).then((response) => {
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
  });
}

async function listScoresOfUser(interaction, userId) {
  interaction.client.scoreService.getScoresOfUser(userId).then((response) => {
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
  });
}

async function listScoresOfUserForGame(interaction, gameId, userId) {
  interaction.client.scoreService.getScoresForGameOfUser(gameId, userId).then((response) => {
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
  });
}
