const router = require('express').Router();

const {reportsDashboard} = require('../controllers/report.controller')

router.get('/',reportsDashboard )






module.exports = router;