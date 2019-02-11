class SessionController {
  async create(req, res) {
    return res.render('auth/signin')
  }
}

module.exports = new SessionController()
