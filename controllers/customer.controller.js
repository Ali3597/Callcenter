
const {createCustomer,findLimitedCustomers,countCustomers,findCustomerByName} = require ("../queries/customers.queries")
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
res.render('customers/profileCustomer',{customer} )
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

