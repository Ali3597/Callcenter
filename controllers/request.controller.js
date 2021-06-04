const {findLimitedRequests,countRequests,findLimitedRequestsByCustomerId,findRequestByIdWithCustomersAssociate,DeleteRequestById,getDoneRequest,getUndoneRequest,createRequest, countRequestsByCustomerId} = require ("../queries/requests.queries")
const {findLimitedReportsByRequestsId,countReportsByRequestId} = require ('../queries/reports.queries')
const {findCustomersAlphabeticallySorted,findCustomerById} = require ('../queries/customers.queries')
const {pageCalculator,range,urgencyColor,subMessage,properStringDate,deadlineTimeCalcul,titleMessage,titleMessageOn} = require ("./functions.controller")
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]
const reportsTableFormat= ["auteur","Message" ,"Date" ,"action"]

    exports.requestsDashboard= async (req, res, next) => { 
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        titleRequests= titleMessage("requests",requests)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests,
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
        
        titleReports=titleMessageOn("reports",reports)
        pageNumberReports= pageCalculator(reportsNumbers,5)
        
     res.render('requests/requestProfile',{
        profile:true,
         request,
         reports,   
         titleReports,
         pageNumberReports,
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
        titleRequests=titleMessage("requests", requests)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests,
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
        titleRequests= titleMessage("requests", requests)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests,
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
        titleRequests= titleMessage("requests", requests)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests,
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


    exports.formNewRequest= async (req, res, next) => {  
        selectedCustomerId=req.body.item
        if (selectedCustomerId){
            selectedCustomer = await findCustomerById(selectedCustomerId)
            customers=false

        }else{
            selectedCustomer=false
            customers = await findCustomersAlphabeticallySorted()
        }
    res.render('requests/formRequests', {
        customers,
        selectedCustomer,
        titleForm:"Nouvelle requete ",
    } )
    }
    


    exports.newRequest=  async (req, res, next) => {
        try {
        currentUserId= req.user.id
        requestArray =req.body.arrayValue
        customerId = requestArray[0]
        await createRequest(requestArray,currentUserId)
        const [customer,requests,requestsNumbers]=await Promise.all([
        findCustomerById(customerId),
        findLimitedRequestsByCustomerId(5,0,customerId),
        countRequestsByCustomerId(customerId)],)           
    pageNumberRequests= pageCalculator(requestsNumbers,5)
    res.render('customers/profileCustomer',{
        profile:true,
        customer,
        requests,
        titleRequests:"Requetes sur le client ",
        pageNumberRequests,
        requestTableFormat,
        subMessage,
        range,
        properStringDate,
        urgencyColor,
        deadlineTimeCalcul
             } )
             }
     catch (e) {
         console.log(e)
         res.status(404).send()

        }
        
    } 
    


    exports.searchRequests= async (req, res, next) => { 
        const [requests,requestsNumbers]=await Promise.all([findLimitedRequests(5,0),countRequests()])
        pageNumberRequests= pageCalculator(requestsNumbers,5)
        titleRequests= titleMessage("requests",requests)
    res.render('requests/tableRequests', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        requests,
        titleRequests,
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
    