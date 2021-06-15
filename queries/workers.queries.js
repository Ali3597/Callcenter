const Worker = require('../database/models/worker.model');


exports.findWorkerPerEmail= (email)=> {
    return Worker.findOne({'local.email':email}).exec();
  }

  
  exports.findWorkerPerId= (id)=> {
    return Worker.findById(id).exec();
  }

  exports.findWorkerPerUsername= (username)=> {
    return Worker.findOne({username}).exec()
  }
  
  exports.createWorker = async (user) => {
    try {
      const hashedPassword = await Worker.hashPassword(user.password);
      const newWorker = new Worker({
        username: user.username,
        type:"assistant",
        number:"worker",
        local: {
          email: user.email,
          password: hashedPassword
          
        }
      })
      return newWorker.save();
    } catch(e) {
      throw e;
    }
  }
 
  exports.updateAvailableWorkerById=async (userId)=> {
    value = await Worker.findOne({_id:userId}).exec()
    return   Worker.findByIdAndUpdate(userId,{$set:{available : !value.available}},{runValidators: true  } ).exec();
}


exports.updateAvailableToFalseById=async (userId)=> {
  return   Worker.findByIdAndUpdate(userId,{$set:{available : false}},{runValidators: true  } ).exec();
}


exports.updateAvailableToTrueById=async (userId)=> {
  return   Worker.findByIdAndUpdate(userId,{$set:{available : true}},{runValidators: true  } ).exec();
}

exports.findAllTheAvailableWorkers= ()=> {
  return   Worker.find(
    {$where: function(){
      return (this.available==true)
    }
    }
  ).exec()
}


