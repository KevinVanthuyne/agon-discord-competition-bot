const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class ScoreService {
  getRanking(gameId) {
    return axios.get(`${apiUrl}/api/v1/score/game/${gameId}/ranking`);
  }

  getScoresForGameOfUser(gameId, userId) {
    return axios.get(`${apiUrl}/api/v1/score/game/${gameId}/user/${userId}`);
  }

  getScoresForGame(gameId) {
    return axios.get(`${apiUrl}/api/v1/score/game/${gameId}`);
  }

  getScoresOfUser(userId) {
    return axios.get(`${apiUrl}/api/v1/score/user/${userId}`);
  }

  addScore({ points, scoreImageUrl, userId, username, gameId }) {
    return axios.post(`${apiUrl}/api/v1/score`, {
      points,
      scoreImageUrl,
      userId,
      username,
      gameId,
    });
  }
};
