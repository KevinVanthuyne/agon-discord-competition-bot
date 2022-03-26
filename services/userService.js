const axios = require('axios').default;

module.exports = class UserService {
  updateUser({ id, name, initials }) {
    return axios.put(`${process.env.API_URL}/api/v1/user`, {
      id,
      name,
      initials,
    });
  }
};
