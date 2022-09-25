const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class GameService {
  addGame({ name }) {
    return axios.post(
      `${process.env.API_URL}/api/v1/game`,
      {
        name,
      },
      { auth },
    );
  }

  updateGame({ id, newName }) {
    return axios.put(
      `${process.env.API_URL}/api/v1/game`,
      {
        id,
        name: newName,
      },
      { auth },
    );
  }

  deleteGame({ id }) {
    return axios.delete(
      `${process.env.API_URL}/api/v1/game`,
      {
        id,
      },
      { auth },
    );
  }

  getGames() {
    return axios.get(`${process.env.API_URL}/api/v1/game`, {
      auth,
    });
  }

  getActiveGame() {
    return axios.get(`${process.env.API_URL}/api/v1/game/active`, { auth });
  }

  getGame(id) {
    return axios.get(`${process.env.API_URL}/api/v1/game/${id}`, { auth });
  }
};
