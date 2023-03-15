const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class ScoreService {
  deleteScore(id) {
    return axios.delete(`${process.env.API_URL}/api/v1/scores/${id}`, { auth });
  }

  // Refactored
  getRanking(gameId) {
    return axios.get(`${process.env.API_URL}/api/v1/scores/game/${gameId}/ranking`, { auth });
  }

  // Refactored
  getCurrentRanking() {
    return axios.get(`${process.env.API_URL}/api/v1/scores/ranking`, { auth });
  }

  // Refactored
  getPersonalBest(userId) {
    return axios.get(`${process.env.API_URL}/api/v1/scores/user/${userId}/personal-best`, { auth });
  }

  addScore({ points, scoreImageUrl, userId, username, gameId }) {
    return axios.post(
      `${process.env.API_URL}/api/v1/scores`,
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
