const router = require('express').Router();

const {reportsDashboard,reportProfile,deleteReport} = require('../controllers/report.controller')

router.get('/',reportsDashboard )
router.get('/profil/:reportId', reportProfile)
router.get('/delete/:reportId', deleteReport)







module.exports = router;
