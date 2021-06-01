const {doWeKnowThisNumber}= require('../queries/customers.queries')
const {getLimitedAlertRequests,countAlertedRequest} = require('../queries/requests.queries')
const {pageCalculator,range,urgencyColor,subMessage,properStringDate,deadlineTimeCalcul} = require ("./functions.controller")
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]




exports.waitDashboard =async (req, res, next) => {
    try {
const [requests,requestsNumbers]=await Promise.all([getLimitedAlertRequests(5,0),countAlertedRequest()])
pageNumberRequests= pageCalculator(requestsNumbers,5)
res.render('dashboard/theDashboard', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    title:"Accuueil",
    requests,
    requestTableFormat,
    pageNumberRequests,
    subMessage,
    range,
    properStringDate,
    urgencyColor,
    deadlineTimeCalcul,
} )
    } catch (error) {
        next(error)
    }
}



exports.homeDashboard = async  (req, res, next) => {
const [requests,requestsNumbers]=await Promise.all([getLimitedAlertRequests(5,0),countAlertedRequest()])
pageNumberRequests= pageCalculator(requestsNumbers,5)
res.render('includes/center', {
    title:"Accuueil",
    requests,
    requestTableFormat,
    pageNumberRequests,
    subMessage,
    range,
    properStringDate,
    urgencyColor,
    deadlineTimeCalcul,

} )
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
    