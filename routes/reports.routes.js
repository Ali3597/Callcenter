const router = require('express').Router();

const {reportsDashboard,reportProfile} = require('../controllers/report.controller')

router.get('/',reportsDashboard )
router.get('/profil/:reportId', reportProfile)






module.exports = router;