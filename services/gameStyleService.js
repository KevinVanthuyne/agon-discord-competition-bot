const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class GameStyleService {
  getGameStyle({ gameId }) {
    return axios.get(`${process.env.API_URL}/api/v1/game-styles/${gameId}`, {
      auth,
    });
  }

  updateGameStyle({ gameId, backgroundImage, backgroundColor, headerImage, borderColor, fontColor }) {
    return axios.put(
      `${process.env.API_URL}/api/v1/game-styles`,
      {
        gameId,
        backgroundImage,
        backgroundColor,
        headerImage,
        borderColor,
        fontColor,
      },
      { auth },
    );
  }
};
