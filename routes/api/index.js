const router = require('express').Router();
const testRoutes = require('./test-routes');
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


router.use('/test', testRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;