const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class SettingsService {
  constructor() {
    this.scoringChannelId = undefined;
    this.hallOfFameChannelId = undefined;
    this.gameAnnouncementChannelId = undefined;
    this.fetchAllChannels();
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

  setGameAnnouncementChannel({ channelId }) {
    return this.setChannel('game-announcement', channelId).then((res) => {
      this.gameAnnouncementChannelId = channelId;
      return res;
    });
  }

  setChannel(channel, channelId) {
    return axios.post(
      `${process.env.API_URL}/api/v1/settings/channels`,
      {
        channel,
        channelId,
      },
      { auth },
    );
  }

  async fetchAllChannels() {
    await Promise.allSettled([
      this.fetchScoringChannel(),
      this.fetchHallOfFameChannel(),
      this.fetchGameAnnouncementChannel(),
    ])
      .then((res) => {
        this.scoringChannelId = res[0]?.value?.data?.value;
        this.hallOfFameChannelId = res[1]?.value?.data?.value;
        this.gameAnnouncementChannelId = res[2]?.value?.data?.value;
      })
      .catch((error) => {
        console.log('Channel fetching error:', error);
      });
  }

  fetchScoringChannel() {
    return this.fetchChannel('scoring');
  }

  fetchHallOfFameChannel() {
    return this.fetchChannel('hall-of-fame');
  }

  fetchGameAnnouncementChannel() {
    return this.fetchChannel('game-announcement');
  }

  fetchChannel(channel) {
    return axios.get(`${process.env.API_URL}/api/v1/settings/channels/${channel}`, { auth });
  }
};
