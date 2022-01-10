const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class GameService {
  addGame({ name }) {
    return axios.post(`${apiUrl}/api/v1/games`, {
      name,
    });
  }

  getGames() {
    return axios.get(`${apiUrl}/api/v1/games`);
  }
};
