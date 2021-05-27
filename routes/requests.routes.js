const router = require('express').Router();

const {requestsDashboard} = require('../controllers/request.controller')

router.get('/',requestsDashboard)







module.exports = router;