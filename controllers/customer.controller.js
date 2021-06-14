
const {createCustomer,findLimitedCustomers,countCustomers,findCustomerById,findCustomerByName,findCustomersLikeNameLimited,countCustomersLikeName,deleteCustomerById} = require ("../queries/customers.queries")
const {findLimitedRequestsByCustomerId,countRequestsByCustomerId,createRequestOnCustomerId,findLimitedRequestsByCustomerIdWithCustomersAssociate}= require ('../queries/requests.queries')




const {pageCalculator,range,urgencyColor,  subMessage,properStringDate,deadlineTimeCalcul,titleMessage,titleMessageOn} = require ("./functions.controller")

const customerTableFormat= ["Nom" ,"Numero" ,"email","action"]
const customerFormFormat= ["Nom" ,"Numero" ,"email"]
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]







exports.customersDashboard= async (req, res, next) => { 
    page = req.params.page
    skip = (5*page)-5
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(5,skip),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers,5)
    titleCustomers= titleMessage("customers",customers)
res.render('customers/tableCustomers', {
    page,
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
    page = req.params.page
    skip = (3*page)-3
   const  customerId=  req.params.customerId;
   const [customer,requests,requestsNumbers]=await Promise.all([
    findCustomerById(customerId),
    findLimitedRequestsByCustomerIdWithCustomersAssociate(3,skip,customerId),
    countRequestsByCustomerId(customerId)],)
    titleRequests=titleMessageOn("requests",requests)
   pageNumberRequests= pageCalculator(requestsNumbers,3)

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
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(5,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers,5)
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
    await createCustomer(customerArray)
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(5,0),countCustomers()])
    pageNumberCustomers= pageCalculator(customersNumbers,5)
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
     findLimitedRequestsByCustomerIdWithCustomersAssociate(3,0,customerId),
     countRequestsByCustomerId(customerId)],)
    titleRequests=titleMessageOn("requests", requests)
    pageNumberRequests= pageCalculator(requestsNumbers,3)
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




 exports.searchCustomers= async (req, res, next) => { 
     searchValue = req.body.searchValue
    const [customers,customersNumbers]=await Promise.all([findCustomersLikeNameLimited(searchValue,5,0),countCustomersLikeName(searchValue)])
    pageNumberCustomers= pageCalculator(customersNumbers,5)
    titleCustomers= titleMessage("customers",customers)
res.render('customers/tableCustomers', {
    
    customers,
    titleCustomers,
    customerTableFormat,
    pageNumberCustomers,
    range,
} )
}


