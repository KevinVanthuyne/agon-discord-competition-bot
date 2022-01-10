const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class ScoreService {
  getRanking(gameId) {
    return axios.get(`${apiUrl}/api/v1/scores/${gameId}/ranking`);
  }

  addScore({ points, scoreImageUrl, userId, username, gameId }) {
    return axios.post(`${apiUrl}/api/v1/scores`, {
      points,
      scoreImageUrl,
      userId,
      username,
      gameId,
    });
  }
};
