const {findLimitedRequests,countRequests} = require ("../queries/requests.queries")
const {pageCalculator,range,urgencyColor,subMessage,properStringDate} = require ("./functions.controller")
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]

    exports.requestsDashboard= async (req, res, next) => { 
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        // theSubMessage= subMessage(20,requests.message)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        title:"Requetes",
        requestTableFormat,
        pageNumberRequests,
        subMessage,
        range,
        properStringDate,
        urgencyColor,
        areWeInTherequest:true
    } )
    }
    