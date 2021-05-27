const router = require('express').Router();

const {customersDashboard,newCustomers,formNewCustomer} = require('../controllers/customer.controller')

router.get('/', customersDashboard)
router.get('/form', formNewCustomer)
router.post('/new', newCustomers)






module.exports = router;