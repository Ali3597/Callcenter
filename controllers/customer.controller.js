
const {createCustomer,findLimitedCustomers,countCustomers,findCustomerById,findCustomerByName,deleteCustomerById} = require ("../queries/customers.queries")
const {findLimitedRequestsByCustomerId,countRequestsByCustomerId}= require ('../queries/requests.queries')




const {pageCalculator,range,urgencyColor,  subMessage,properStringDate,deadlineTimeCalcul} = require ("./functions.controller")

const customerTableFormat= ["avatar","Nom" ,"Numero" ,"email","action"]
const customerFormFormat= ["Nom" ,"Numero" ,"email"]
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]







exports.customersDashboard= async (req, res, next) => { 
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(10,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers)
res.render('customers/tableCustomers', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    customers,
    titleCustomers:"Clients",
    customerTableFormat,
    pageNumberCustomers,
    range,
} )
}



exports.formNewCustomer= async (req, res, next) => { 
    console.log(req.cookies.callerNumber)
    console.log("la"),
res.render('customers/formCustomers', {
    customerFormFormat,
    number:req.cookies.callerNumber,
    titleCustomers:"Nouveau Client ",
} )
}


exports.customerProfile= async (req, res, next) => { 
   const  customerId=  req.params.customerId;
   const [customer,requests,requestsNumbers]=await Promise.all([
    findCustomerById(customerId),
    findLimitedRequestsByCustomerId(5,0,customerId),
    countRequestsByCustomerId(customerId)],)

   pageNumberRequests= pageCalculator(requestsNumbers,5)

res.render('customers/profileCustomer',{
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



exports.deleteCustomer=  async (req, res, next) => {
    try {
    const  customerId=  req.params.customerId
    await deleteCustomerById(customerId)
    const [customer,requests,requestsNumbers]=await Promise.all([
        findCustomerById(customerId),
        findLimitedRequestsByCustomerId(5,0,customerId),
        countRequestsByCustomerId(customerId)],)
       pageNumberRequests= pageCalculator(requestsNumbers,5)
    res.render('customers/profileCustomer',{
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
    next(e)
        
    }
} 




// exports.reportsDashboard= async (req, res, next) => { 
//     const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
//     pageNumber= pageCalculator(reportsNumbers)
// res.render('reports/tableReports', {
//     isAuthenticated: req.isAuthenticated(),
//     currentUser:req.user,
//     reports,
//     title:"Reports",
//     reportsTableFormat,
//     pageNumber,
//     range,
//     subMessage,
//     properStringDate
// } )
// }



exports.newCustomers=  async (req, res, next) => {
    console.log("on est laaaaaaaaaaa")
    try {
    customerArray =req.body.arrayValue
    await createCustomer(customerArray)
    res.send()
    } catch (e) {
        res.send( {error:"Erreur dans le formulaire"})
        
    }
    
} 

