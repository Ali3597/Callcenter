const router = require('express').Router();

const {customersDashboard,newCustomers,formNewCustomer,customerProfile} = require('../controllers/customer.controller')

router.get('/', customersDashboard)
router.get('/form', formNewCustomer)
router.post('/new', newCustomers)
router.get('/profil/:customerId', customerProfile)






module.exports = router;