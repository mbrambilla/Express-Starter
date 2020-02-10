const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // Get a cookie
  // response.cookies.nameOfCookie

  const token = req.header('x-auth-token')
  if (!token) {
    return res
      .status(401)
      .send('Access denied. No token provided.')
      // TODO: Should we redirect to the login page?
      // .redirect(401, '/login')
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decoded
    next()
  }

  catch (ex) {
    res.status(400).send('Invalid token.')
  }
}