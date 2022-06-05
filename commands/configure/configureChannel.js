module.exports = async function execute(interaction) {
  const channelId = interaction.options.getNumber('channel-id');
  const type = interaction.options.getString('type');
  let request;

  switch (type) {
    case 'scoring':
      request = interaction.client.settingsService.setScoringChannel({ channelId });
      break;

    case 'hall-of-fame':
      request = interaction.client.settingsService.setHallOfFameChannel({ channelId });
      break;

    case 'winner':
      request = interaction.client.settingsService.setWinnerAnnouncementChannel({ channelId });
      break;

    default:
      break;
  }

  if (!request) {
    interaction.reply({
      content: 'Channel could not be updated',
      ephemeral: true,
    });
  }

  await request
    .then(() => {
      interaction.reply({
        content: 'Channel was updated',
        ephemeral: true,
      });
    })
    .catch((error) => {
      console.log('Channel set error:', error);
      interaction.reply({
        content: 'An error occurred.',
        ephemeral: true,
      });
    });
};
