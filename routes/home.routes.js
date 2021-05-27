const router = require('express').Router();

const {homeDashboard} = require('../controllers/dashboard.controller')

router.get('/', homeDashboard)






module.exports = router;