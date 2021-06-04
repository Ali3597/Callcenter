const router = require('express').Router();

const {customersDashboard,newCustomers,formNewCustomer,customerProfile,deleteCustomer,searchCustomers} = require('../controllers/customer.controller')

router.get('/', customersDashboard)
router.post('/form', formNewCustomer)
router.post('/new', newCustomers)
router.get('/profil/:customerId', customerProfile)
router.get('/delete/:customerId', deleteCustomer)
router.post('/search',searchCustomers)







module.exports = router;