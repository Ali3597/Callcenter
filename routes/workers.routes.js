const router = require('express').Router();

const {signupForm, signup,updateAvailable} = require('../controllers/worker.controller');


router.get('/signup/form', signupForm)
router.post('/signup', signup)
router.post('/availableUpdate',updateAvailable)

// router.post('/update/image',ensureAuthenticated, uploadImage)



module.exports = router;