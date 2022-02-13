const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class ScoreService {
  getScore(id) {
    return axios.get(`${apiUrl}/api/v1/score/${id}`);
  }

  deleteScore(id) {
    return axios.delete(`${apiUrl}/api/v1/score/${id}`);
  }

  getRanking(gameId) {
    return axios.get(`${apiUrl}/api/v1/score/game/${gameId}/ranking`);
  }

  getCurrentRanking() {
    return axios.get(`${apiUrl}/api/v1/score/ranking`);
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

  getPersonalBest(userId) {
    return axios.get(`${apiUrl}/api/v1/score/user/${userId}/personal-best`);
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
