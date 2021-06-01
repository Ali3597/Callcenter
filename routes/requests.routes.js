const router = require('express').Router();

const {requestsDashboard,requestProfile} = require('../controllers/request.controller')

router.get('/',requestsDashboard)
router.get('/profil/:requestId', requestProfile)








module.exports = router;