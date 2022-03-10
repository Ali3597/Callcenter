
const {createWorker,updateAvailableWorkerById} = require ('../queries/workers.queries')




exports.signupForm = (req, res, next) => {
    res.render('workers/worker-form',{errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    }
    

exports.signup =  async (req, res, next) => {
    try {
        const body = req.body
        const user = await createWorker(body)
        req.login(user);
        res.redirect('/');
        
    } catch (e) {
        res.render('workers/worker-form',{errors: [e.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    }
  }


  exports.updateAvailable = async (req, res, next) => {
    userId=req.user._id
    newuser=await updateAvailableWorkerById(userId)
    res.send()
    }


