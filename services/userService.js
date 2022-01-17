const axios = require('axios').default;
const { apiUrl } = require('../config.json');

module.exports = class UserService {
  updateUser({ id, name, initials }) {
    return axios.put(`${apiUrl}/api/v1/user`, {
      id,
      name,
      initials,
    });
  }
};
