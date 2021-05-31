
const {createCustomer,findLimitedCustomers,countCustomers,findCustomerByName} = require ("../queries/customers.queries")
const {findLimitedRequestsByCustomerId,countRequestsByCustomerId}= require ('../queries/requests.queries')
const {findLimitedReportsByCustomerId,countReportsByCustomerId}= require ('../queries/reports.queries')



const {pageCalculator,range,urgencyColor,  subMessage,properStringDate} = require ("./functions.controller")

const customerTableFormat= ["avatar","Nom" ,"Numero" ,"email","action"]
const customerFormFormat= ["Nom" ,"Numero" ,"email"]
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]
const reportsTableFormat= ["auteur","Customer","Message" ,"Date" ,"action"]






exports.customersDashboard= async (req, res, next) => { 
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(10,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers)
res.render('customers/tableCustomers', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    customers,
    title:"Clients",
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
    title:"Clients",
} )
}


exports.customerProfile= async (req, res, next) => { 
   const  customerName=  req.params.customerName;
   const customer = await findCustomerByName(customerName)
   
   const [reports,reportsNumbers,requests,requestsNumbers]=await Promise.all([
    findLimitedReportsByCustomerId(5,0,customer._id),
    countReportsByCustomerId(customer._id),
    findLimitedRequestsByCustomerId(5,0,customer._id),
    countRequestsByCustomerId(customer._id)],)

   pageNumberRequests= pageCalculator(requestsNumbers,5)
   pageNumberReports= pageCalculator(reportsNumbers,5)
res.render('customers/profileCustomer',{
    customer,
    requests,
    title:"Requetes",
    pageNumberRequests,
    pageNumberReports,
    requestTableFormat,
    reportsTableFormat,
    reports,
    subMessage,
    range,
    properStringDate,
    urgencyColor
} )
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

