

const passport = require('passport');
const {createWorker} = require ('../queries/workers.queries')



exports.signupForm = (req, res, next) => {
    res.render('workers/worker-form',{errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    }
    

exports.signup =  async (req, res, next) => {
    const body = req.body
    console.log(body)

    try {
        const user = await createWorker(body)
        req.login(user, (err) => {
          if (err) { next(err) } else {
            res.redirect('/');
          }
        })
        
    } catch (e) {
        res.render('workers/worker-form',{errors: [e.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    }
  }