const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class SettingsService {
  setScoringChannel({ channelId }) {
    return this.setChannel('scoring', channelId);
  }

  setHallOfFameChannel({ channelId }) {
    return this.setChannel('hall-of-fame', channelId);
  }

  setWinnerAnnouncementChannel({ channelId }) {
    return this.setChannel('winner', channelId);
  }

  setChannel(channel, channelId) {
    return axios.post(
      `${process.env.API_URL}/api/v1/setting/channel`,
      {
        channel,
        channelId,
      },
      { auth },
    );
  }

  getAllChannels() {
    return Promise.allSettled([
      this.getScoringChannel(),
      this.getHallOfFameChannel(),
      this.getWinnerAnnouncementChannel(),
    ]).then((res) => ({
      scoring: res[0]?.value?.data || '',
      hallOfFame: res[1]?.value?.data || '',
      winner: res[2]?.value?.data || '',
    }));
  }

  getScoringChannel() {
    return this.getChannel('scoring');
  }

  getHallOfFameChannel() {
    return this.getChannel('hall-of-fame');
  }

  getWinnerAnnouncementChannel() {
    return this.getChannel('winner');
  }

  getChannel(channel) {
    return axios.get(`${process.env.API_URL}/api/v1/setting/channel/${channel}`, { auth });
  }
};
