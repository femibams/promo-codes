const userController = require('../controllers/User');

module.exports.setup = (app) => {
    app.post(
        '/user/register',
        (req, res) => userController.registerUser(req, res)
    )

    app.post(
        '/user/login',
        (req, res) => userController.loginUser(req, res)
    )
}