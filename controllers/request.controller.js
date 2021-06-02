const {findLimitedRequests,countRequests,findRequestByIdWithCustomersAssociate,DeleteRequestById,getDoneRequest,getUndoneRequest} = require ("../queries/requests.queries")
const {findLimitedReportsByRequestsId,countReportsByRequestId} = require ('../queries/reports.queries')
const {pageCalculator,range,urgencyColor,subMessage,properStringDate,deadlineTimeCalcul} = require ("./functions.controller")
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]
const reportsTableFormat= ["auteur","Message" ,"Date" ,"action"]

    exports.requestsDashboard= async (req, res, next) => { 
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        // theSubMessage= subMessage(20,requests.message)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests:"Requetes",
        requestTableFormat,
        pageNumberRequests,
        subMessage,
        range,
        properStringDate,
        urgencyColor,
        deadlineTimeCalcul,
        areWeInTherequest:true
    } )
    }
    


    exports.requestProfile= async (req, res, next) => { 
        const  requestId=  req.params.requestId;
        const [request,reports,reportsNumbers]=await Promise.all([
        findRequestByIdWithCustomersAssociate(requestId),
        findLimitedReportsByRequestsId(5,0,requestId),
        countReportsByRequestId(requestId)],)
     
        pageNumberReports= pageCalculator(reportsNumbers,5)
     
     res.render('requests/requestProfile',{
         request,
         reports,   
         title : "Requete",
         titleReports:"Rapport concernant la requete",
         pageNumberRequests,
         reportsTableFormat,
         subMessage,
         deadlineTimeCalcul,
         urgencyColor,
         range,
         properStringDate,
     } )
     }

     exports.undoneRequest=async (req, res, next) => { 
        const  requestId=  req.params.requestId;
        await getUndoneRequest(requestId)
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        // theSubMessage= subMessage(20,requests.message)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests:"Requetes",
        requestTableFormat,
        pageNumberRequests,
        subMessage,
        range,
        properStringDate,
        urgencyColor,
        deadlineTimeCalcul,
        areWeInTherequest:true
    } )
    }


     exports.doneRequest=async (req, res, next) => { 
        const  requestId=  req.params.requestId;
        await getDoneRequest(requestId)
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        // theSubMessage= subMessage(20,requests.message)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests:"Requetes",
        requestTableFormat,
        pageNumberRequests,
        subMessage,
        range,
        properStringDate,
        urgencyColor,
        deadlineTimeCalcul,
        areWeInTherequest:true
    } )
    }

     exports.deleteRequest= async (req, res, next) => { 
        const  requestId=  req.params.requestId;
        await DeleteRequestById(requestId)
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        // theSubMessage= subMessage(20,requests.message)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests:"Requetes",
        requestTableFormat,
        pageNumberRequests,
        subMessage,
        range,
        properStringDate,
        urgencyColor,
        deadlineTimeCalcul,
        areWeInTherequest:true
    } )
    }