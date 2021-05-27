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