const Customer = require ("../database/models/customer.model")





exports.createCustomer= (array)=> {

    const newCustomer = new Customer({
      name:array[0],
      number:array[1],
      email:array[2]
    });
    return   newCustomer.save();
  }

exports.findLimitedCustomers=(limit,skip)=>{
  return   Customer.find({}).limit(limit).skip(skip).exec();

}

exports.countCustomers= ()=> {

  return   Customer.find({}).count().exec();
}

exports.doWeKnowThisNumber= (customerNumber)=> {

  return   Customer.findOne({number:customerNumber}).exec();
}

exports.findCustomerByName= (customerName)=> {

  return   Customer.findOne({name:customerName}).exec();
}



