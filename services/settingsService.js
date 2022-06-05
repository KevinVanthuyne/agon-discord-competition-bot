const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class SettingsService {
  setScoringChannel({ channelId }) {
    return axios.post(
      `${process.env.API_URL}/api/v1/settings/channel/scoring`,
      {
        channelId,
      },
      { auth },
    );
  }

  setHallOfFameChannel({ channelId }) {
    return axios.post(
      `${process.env.API_URL}/api/v1/settings/channel/hall-of-fame`,
      {
        channelId,
      },
      { auth },
    );
  }

  setWinnerAnnouncementChannel({ channelId }) {
    return axios.post(
      `${process.env.API_URL}/api/v1/settings/channel/winner`,
      {
        channelId,
      },
      { auth },
    );
  }
};
