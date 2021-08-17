const { Test } = require('../models');

const testController = {
    getAllTest(req, res) {
        Test.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}

module.exports = testController;