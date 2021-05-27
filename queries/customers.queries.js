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

exports.countCustomers= (array)=> {

  return   Customer.find({}).count().exec();
}