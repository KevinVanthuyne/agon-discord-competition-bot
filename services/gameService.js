const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class GameService {
  getActiveGame() {
    return axios.get(`${process.env.API_URL}/api/v1/games/active`, { auth });
  }
};
