const router = require('express').Router();


const {callsDashboard}= require ("../controllers/call.controller")




router.get('/:page', callsDashboard)



module.exports = router;