const router = require('express').Router();

const {customersDashboard,newCustomers,formNewCustomer,customerProfile,deleteCustomer,newRequestOnCustomer} = require('../controllers/customer.controller')

router.get('/', customersDashboard)
router.get('/form', formNewCustomer)
router.post('/new', newCustomers)
router.get('/profil/:customerId', customerProfile)
router.get('/delete/:customerId', deleteCustomer)
// router.get('/newrequest/:customerId', newRequestOnCustomer)






module.exports = router;