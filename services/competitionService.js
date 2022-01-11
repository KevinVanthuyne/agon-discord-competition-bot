const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class CompetitionService {
  startCompetition({ startDate }) {
    return axios.post(`${apiUrl}/api/v1/competition`, { startDate });
  }
};
