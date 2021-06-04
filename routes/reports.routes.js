const router = require('express').Router();

const {reportsDashboard,reportProfile,deleteReport,formNewReport,newReport,searchReports} = require('../controllers/report.controller')

router.get('/',reportsDashboard )
router.get('/profil/:reportId', reportProfile)
router.get('/delete/:reportId', deleteReport)
router.post('/form', formNewReport)
router.post('/new',newReport)
router.post('/search',searchReports)






module.exports = router;
