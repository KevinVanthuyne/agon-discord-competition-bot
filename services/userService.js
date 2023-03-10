const axios = require('axios').default;
const auth = require('../config/apiAuth');

module.exports = class UserService {
  updateUser({ id, name, initials }) {
    return axios.put(
      `${process.env.API_URL}/api/v1/users`,
      {
        id,
        name,
        initials,
      },
      { auth },
    );
  }
};
