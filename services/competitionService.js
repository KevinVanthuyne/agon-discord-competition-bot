const axios = require('axios').default;

module.exports = class CompetitionService {
  startCompetition({ startDate }) {
    return axios.post(`${process.env.API_URL}/api/v1/competition`, { startDate });
  }
};
