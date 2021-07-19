const serviceController = require('../controllers/Service')
const auth = require("../core/middleware/auth");

module.exports.setup = (app) => {
    app.post(
        '/service',
        auth,
        (req, res) => serviceController.createService(req, res)
    );

    app.get(
        '/service',
        auth,
        (req, res) => serviceController.searchService(req, res)
    );

    app.post(
        '/activate/bonus',
        auth,
        (req, res) => serviceController.activateBonus(req, res)
    );
}
