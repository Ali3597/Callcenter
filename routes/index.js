const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const workers = require('./workers.routes');
const auth = require('./auth.routes');
const dashboard = require('./dashboard.routes');
const {homepage} = require('../controllers/home.controller');


// const auth = require('./auth.routes');


// router.use('/tweets', ensureAuthenticated, tweets);
router.use('/auth', auth)
router.use('/workers',workers)
router.use('/dashboard',ensureAuthenticated,dashboard)
router.use('/home',homepage)



router.get('/',(req,res) => {
res.redirect('/dashboard');
})


module.exports = router;