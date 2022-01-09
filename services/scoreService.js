const axios = require('axios').default;

module.exports = class ScoreService {
  getScores() {
    return axios.get('http://localhost:8080/api/v1/scores');
  }
};
