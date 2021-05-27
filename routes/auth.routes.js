const router = require('express').Router();
const {signinForm, signin,signout} = require('../controllers/auth.controller');


router.get('/signin/form', signinForm)
router.post('/signin', signin)
router.get('/signout', signout)



module.exports = router;