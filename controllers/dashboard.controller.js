
exports.waitDashboard = (req, res, next) => {
res.render('dashboard/theDashboard', {isAuthenticated: req.isAuthenticated(),currentUser:req.user,title:"Accueil"} )
}

exports.homeDashboard = (req, res, next) => {
res.render('includes/center', {isAuthenticated: req.isAuthenticated(),currentUser:req.user,title:"Accueil"} )
}
