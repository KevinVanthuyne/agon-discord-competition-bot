const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class ScoreService {
  getScores() {
    return axios.get(`${apiUrl}/api/v1/scores`);
  }

  addScore({ score, scoreImageUrl, userId, username, gameId }) {
    return axios.post(`${apiUrl}/api/v1/scores`, {
      score,
      scoreImageUrl,
      userId,
      username,
      gameId,
    });
  }
};
