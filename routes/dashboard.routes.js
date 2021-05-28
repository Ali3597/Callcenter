const router = require('express').Router();
const home = require('./home.routes');
const customers = require('./customers.routes');
const requests = require('./requests.routes');
const reports = require('./reports.routes');
const {waitDashboard,getCall} = require('../controllers/dashboard.controller')

router.get('/', waitDashboard)
router.post('/call', getCall)
router.use('/home', home)
router.use('/customers', customers)
router.use('/requests', requests)
router.use('/reports', reports)






module.exports = router;