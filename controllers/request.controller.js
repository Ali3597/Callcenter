
exports.requestsDashboard = (req, res, next) => {
    res.render('includes/center', {isAuthenticated: req.isAuthenticated(),currentUser:req.user,title:"Requetes"} )
    }