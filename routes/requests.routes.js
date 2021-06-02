const router = require('express').Router();

const {requestsDashboard,requestProfile,deleteRequest,doneRequest,undoneRequest} = require('../controllers/request.controller')

router.get('/',requestsDashboard)
router.get('/profil/:requestId', requestProfile)
router.get('/delete/:requestId', deleteRequest)
router.get('/done/:requestId', doneRequest)
router.get('/undone/:requestId',undoneRequest)








module.exports = router;