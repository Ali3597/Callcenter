const { findWorkerPerEmail } = require('../queries/workers.queries');

exports.signinForm = (req, res, next) => {
  res.render('auth/auth-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user  });
}


exports.signout = (req, res, next) => {
  req.logout();
  res.redirect('/auth/signin/form');
}






exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const worker = await findWorkerPerEmail(email);
    if (worker) {
      const match = await worker.comparePassword(password);
      if (match) {
        req.login(worker);
        res.redirect('/');
      } else {
        res.render('auth/auth-form', { errors: [ info.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user })
      }
    } else {
      res.render('signin', { error: 'worker not found' });
    }
  } catch(e) {
    next(e);
  }

}

exports.signout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}