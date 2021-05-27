const router = require('express').Router();

const {signupForm, signup} = require('../controllers/worker.controller');


router.get('/signup/form', signupForm)
router.post('/signup', signup)
// router.post('/update/image',ensureAuthenticated, uploadImage)



module.exports = router;