const {doWeKnowThisNumber}= require('../queries/customers.queries')
const {getAlertRequests} = require('../queries/requests.queries')



exports.waitDashboard =async (req, res, next) => {
requests =  await getAlertRequests()
res.render('dashboard/theDashboard', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    title:"Accueil",
    requests,
} )
}

exports.homeDashboard = (req, res, next) => {
res.render('includes/center', {isAuthenticated: req.isAuthenticated(),currentUser:req.user,title:"Accueil"} )
}


exports.getCall = async (req, res, next) => {
    customerNumber= req.body.number
    customer= await doWeKnowThisNumber(customerNumber)
    if (customer==null){
        customerName= "unknow"
        res.cookie('callerId', customerName)
        res.cookie('callerNumber',customerNumber)
    }else{
        customerName=customer.name
        res.cookie('callerId', customer._id)
        res.cookie('callerNumber',customerNumber)
    }
    
    res.render('dashboard/call',{customerName,customerNumber} )
    }
    