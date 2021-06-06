const router = require('express').Router();

const {requestsDashboard,requestProfile,formNewRequest,deleteRequest,doneRequest,undoneRequest,newRequest} = require('../controllers/request.controller')


router.get('/',requestsDashboard)
router.get('/profil/:requestId', requestProfile)
router.get('/delete/:requestId', deleteRequest)
router.get('/done/:requestId', doneRequest)
router.get('/undone/:requestId',undoneRequest)
router.post('/form', formNewRequest)
router.post('/new', newRequest)

// router.get('/newreport/:requestId',newReportOnRequest)








module.exports = router;