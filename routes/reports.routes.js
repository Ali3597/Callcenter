const router = require('express').Router();

const {reportsDashboard,reportProfile,deleteReport,formNewReport} = require('../controllers/report.controller')

router.get('/',reportsDashboard )
router.get('/profil/:reportId', reportProfile)
router.get('/delete/:reportId', deleteReport)
router.get('/form', formNewReport)







module.exports = router;
