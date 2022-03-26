const axios = require('axios').default;

module.exports = class GameService {
  addGame({ name }) {
    return axios.post(`${process.env.API_URL}/api/v1/game`, {
      name,
    });
  }

  updateGame({ id, newName }) {
    return axios.put(`${process.env.API_URL}/api/v1/game`, {
      id,
      name: newName,
    });
  }

  getGames() {
    return axios.get(`${process.env.API_URL}/api/v1/game`);
  }

  getActiveGame() {
    return axios.get(`${process.env.API_URL}/api/v1/game/active`);
  }

  getGame(id) {
    return axios.get(`${process.env.API_URL}/api/v1/game/${id}`);
  }
};
