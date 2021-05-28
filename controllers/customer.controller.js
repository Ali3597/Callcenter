
const {createCustomer,findLimitedCustomers,countCustomers} = require ("../queries/customers.queries")
const {pageCalculator,range} = require ("./functions.controller")

const customerTableFormat= ["avatar","Nom" ,"Numero" ,"email","action"]
const customerFormFormat= ["Nom" ,"Numero" ,"email"]






exports.customersDashboard= async (req, res, next) => { 
    const [customers,customersNumbers]=await Promise.all([findLimitedCustomers(10,0),countCustomers()])
    pageNumber= pageCalculator(customersNumbers)
res.render('customers/tableCustomers', {
    isAuthenticated: req.isAuthenticated(),
    currentUser:req.user,
    customers,
    title:"Clients",
    customerTableFormat,
    pageNumber,
    range,
} )
}



exports.formNewCustomer= async (req, res, next) => { 
    console.log(req.cookies.callerNumber)
res.render('customers/formCustomers', {
    customerFormFormat,
    number:req.cookies.callerNumber,
    title:"Clients",
} )
}




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

