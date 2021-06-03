const router = require('express').Router();

const {reportsDashboard,reportProfile,deleteReport,formNewReport,newReport} = require('../controllers/report.controller')

router.get('/',reportsDashboard )
router.get('/profil/:reportId', reportProfile)
router.get('/delete/:reportId', deleteReport)
router.post('/form', formNewReport)
router.post('/new',newReport)







module.exports = router;
