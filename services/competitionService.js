const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class CompetitionService {
  startCompetition({ startDate }) {
    return axios.post(`${process.env.API_URL}/api/v1/competition`, { startDate }, { auth });
  }
};
