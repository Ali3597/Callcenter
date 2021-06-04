
const {createCustomer,findLimitedCustomers,countCustomers,findCustomerById,findCustomerByName,deleteCustomerById} = require ("../queries/customers.queries")
const {findLimitedRequestsByCustomerId,countRequestsByCustomerId,createRequestOnCustomerId,findLimitedRequestsByCustomerIdWithCustomersAssociate}= require ('../queries/requests.queries')




const {pageCalculator,range,urgencyColor,  subMessage,properStringDate,deadlineTimeCalcul,titleMessage,titleMessageOn} = require ("./functions.controller")

const customerTableFormat= ["Nom" ,"Numero" ,"email","action"]
const customerFormFormat= ["Nom" ,"Numero" ,"email"]
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]







exports.customersDashboard= async (req, res, next) => { 
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(10,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers)
    titleCustomers= titleMessage("customers",customers)
res.render('customers/tableCustomers', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    customers,
    titleCustomers,
    customerTableFormat,
    pageNumberCustomers,
    range,
} )
}



exports.formNewCustomer= async (req, res, next) => { 
    
res.render('customers/formCustomers', {
    number:req.cookies.callerNumber,
    titleForm:"Nouveau Client ",
} )
}


exports.customerProfile= async (req, res, next) => { 
   const  customerId=  req.params.customerId;
   const [customer,requests,requestsNumbers]=await Promise.all([
    findCustomerById(customerId),
    findLimitedRequestsByCustomerIdWithCustomersAssociate(5,0,customerId),
    countRequestsByCustomerId(customerId)],)
    titleRequests=titleMessageOn("requests",requests)
   pageNumberRequests= pageCalculator(requestsNumbers,5)

res.render('customers/profileCustomer',{
    profile:true,
    customer,
    requests,
    titleRequests,
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
    const  customerId=  req.params.customerId
    await deleteCustomerById(customerId)
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(10,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers)
    titleCustomers=titleMessage("customers",customers)
res.render('customers/tableCustomers', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    customers,
    titleCustomers,
    customerTableFormat,
    pageNumberCustomers,
    range,
} )
}








exports.newCustomers=  async (req, res, next) => {
    try {
    customerArray =req.body.arrayValue
    console.log(req.body)
    await createCustomer(customerArray)
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(10,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers)
    titleCustomers= titleMessage("customers", customers)


res.render('customers/tableCustomers', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    customers,
    titleCustomers,
    customerTableFormat,
    pageNumberCustomers,
    range,
} )
    } catch (e) {
        res.status(404).send()
    }
    
} 





exports.newRequestOnCustomer= async (req, res, next) => { 
    const  customerId=  req.params.customerId;
     await createRequestOnCustomerId(customerId)
    const [customer,requests,requestsNumbers]=await Promise.all([
     findCustomerById(customerId),
     findLimitedRequestsByCustomerId(5,0,customerId),
     countRequestsByCustomerId(customerId)],)
        titleRequests=titleMessageOn("requests", requests)
    pageNumberRequests= pageCalculator(requestsNumbers,5)
 res.render('customers/profileCustomer',{
    profile:true,
     customer,
     requests,
     titleRequests,
     pageNumberRequests,
     requestTableFormat,
     subMessage,
     range,
     properStringDate,
     urgencyColor,
     deadlineTimeCalcul
 } )
 }

