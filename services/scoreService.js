const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class ScoreService {
  getScore(id) {
    return axios.get(`${process.env.API_URL}/api/v1/score/${id}`, { auth });
  }

  deleteScore(id) {
    return axios.delete(`${process.env.API_URL}/api/v1/score/${id}`, { auth });
  }

  getRanking(gameId) {
    return axios.get(`${process.env.API_URL}/api/v1/score/game/${gameId}/ranking`, { auth });
  }

  getCurrentRanking() {
    return axios.get(`${process.env.API_URL}/api/v1/score/ranking`, { auth });
  }

  getScoresForGameOfUser(gameId, userId) {
    return axios.get(`${process.env.API_URL}/api/v1/score/game/${gameId}/user/${userId}`, { auth });
  }

  getScoresForGame(gameId) {
    return axios.get(`${process.env.API_URL}/api/v1/score/game/${gameId}`, { auth });
  }

  getScoresOfUser(userId) {
    return axios.get(`${process.env.API_URL}/api/v1/score/user/${userId}`, { auth });
  }

  getPersonalBest(userId) {
    return axios.get(`${process.env.API_URL}/api/v1/score/user/${userId}/personal-best`, { auth });
  }

  addScore({ points, scoreImageUrl, userId, username, gameId }) {
    return axios.post(
      `${process.env.API_URL}/api/v1/score`,
      {
        points,
        scoreImageUrl,
        userId,
        username,
        gameId,
      },
      { auth },
    );
  }
};
