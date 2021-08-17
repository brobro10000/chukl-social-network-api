const { Test } = require('../models');

const testController = {
    // get all pizzas
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