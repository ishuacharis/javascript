var User = require('../db/models/user')

module.exports = {
  async fetchUsers (req, resp, next) {
    const users = await User.find({})
    resp.status(200).json({
      success: true,
      users: users
    })
  }
}
