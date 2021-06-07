const router = require('express').Router();

const {reportsDashboard,reportProfile,deleteReport,formNewReport,newReport} = require('../controllers/report.controller')

router.get('/:page',reportsDashboard )
router.get('/profil/:reportId/:page', reportProfile)
router.get('/delete/:reportId', deleteReport)
router.post('/form', formNewReport)
router.post('/new',newReport)







module.exports = router;
