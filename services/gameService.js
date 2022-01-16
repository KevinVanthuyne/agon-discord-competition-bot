const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class GameService {
  addGame({ name }) {
    return axios.post(`${apiUrl}/api/v1/game`, {
      name,
    });
  }

  updateGame({ id, newName }) {
    return axios.put(`${apiUrl}/api/v1/game`, {
      id,
      name: newName,
    });
  }

  getGames() {
    return axios.get(`${apiUrl}/api/v1/game`);
  }

  getActiveGame() {
    return axios.get(`${apiUrl}/api/v1/game/active`);
  }
};
