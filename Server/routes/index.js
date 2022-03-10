const router = require('express').Router();
const workers = require('./workers.routes');
const auth = require('./auth.routes');
const dashboard = require('./dashboard.routes');
const {homepage} = require('../controllers/home.controller');


// const auth = require('./auth.routes');


// router.use('/tweets', ensureAuthenticated, tweets);q
router.use('/auth', auth)
router.use('/workers',workers)
router.use('/dashboard',dashboard)
router.use('/home',homepage)



// router.get('/',(req,res) => {
// res.redirect('/dashboard');
// })

router.get('/',  (req, res) => {
    req.isAuthenticated() ?  res.redirect('/dashboard'): res.redirect("/home")
  });

module.exports = router;