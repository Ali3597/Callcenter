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
        number:"PJSIP/worker2",
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
    if (value.state=="available"){
    return   Worker.findByIdAndUpdate(userId,{$set:{state : "unavailable"}},{runValidators: true  } ).exec();
    } else if (value.state=="unavailable"){
      return   Worker.findByIdAndUpdate(userId,{$set:{state : "available"}},{runValidators: true  } ).exec();
    }else{
      return   Worker.findByIdAndUpdate(userId,{$set:{state : "occupied"}},{runValidators: true  } ).exec();
    }
}


exports.updateAvailableToFalseById=async (userId)=> {
  return   Worker.findByIdAndUpdate(userId,{$set:{state: "unavailable"}},{runValidators: true  } ).exec();
}

exports.updateAvailableToOccupiedById=async (userId)=> {
  return   Worker.findByIdAndUpdate(userId,{$set:{state : "occupied"}},{runValidators: true  } ).exec();
  
}

exports.updateAvailableToTrueById=async (userId)=> {
  return   Worker.findByIdAndUpdate(userId,{$set:{state : "available"}},{runValidators: true  } ).exec();
}

exports.updateAvailableToTrueAndLastHangUp=async (userId)=> {
  return   Worker.findByIdAndUpdate(userId,{$set:{
    state : "available",
    lastHangUp: Date.now()
  }
  }).exec();
}

exports.findAllTheAvailableWorkers= ()=> {
  return   Worker.find(
    {$where: function(){
      return (this.state=="available")
    }
    }
  ).exec()
}


exports.findAllTheOccupiedWorkers= ()=> {
  return   Worker.find(
    {$where: function(){
      return (this.state=="occupied")
    }
    }
  ).exec()
}





