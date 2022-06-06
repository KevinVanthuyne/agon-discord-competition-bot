const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class SettingsService {
  constructor() {
    this.scoringChannelId = undefined;
    this.hallOfFameChannelId = undefined;
    this.winnerChannelId = undefined;
  }

  setScoringChannel({ channelId }) {
    return this.setChannel('scoring', channelId).then((res) => {
      this.scoringChannelId = channelId;
      return res;
    });
  }

  setHallOfFameChannel({ channelId }) {
    return this.setChannel('hall-of-fame', channelId).then((res) => {
      this.hallOfFameChannelId = channelId;
      return res;
    });
  }

  setWinnerAnnouncementChannel({ channelId }) {
    return this.setChannel('winner', channelId).then((res) => {
      this.winnerChannelId = channelId;
      return res;
    });
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

  fetchAllChannels() {
    return Promise.allSettled([
      this.fetchScoringChannel(),
      this.fetchHallOfFameChannel(),
      this.fetchWinnerAnnouncementChannel(),
    ]).then((res) => {
      this.scoringChannelId = res[0]?.value?.data?.value;
      this.hallOfFameChannelId = res[1]?.value?.data?.value;
      this.winnerChannelId = res[2]?.value?.data?.value;
    });
  }

  fetchScoringChannel() {
    return this.fetchChannel('scoring');
  }

  fetchHallOfFameChannel() {
    return this.fetchChannel('hall-of-fame');
  }

  fetchWinnerAnnouncementChannel() {
    return this.fetchChannel('winner');
  }

  fetchChannel(channel) {
    return axios.get(`${process.env.API_URL}/api/v1/setting/channel/${channel}`, { auth });
  }
};
