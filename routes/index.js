const router = require('express').Router();
// Import all of the API routes form /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require('./api');

// add prefix of `/api` to all of the api routes imported form the `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;