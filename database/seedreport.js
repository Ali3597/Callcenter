const Customer = require("./models/customer.model")
const Report = require("./models/report.model")
const Request = require("./models/request.model")
const mongoose = require("mongoose");
const {findWorkerPerUsername} = require ('../queries/workers.queries');

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/CallCenter",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
    } 
  )
     .then(() => {
        console.log("connexion ok !");
    
        const r1 = new Report({
            message:"ry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ip",
            customer:"60b4fd78fceeef63e42b495b",
            author:"60ad24ae28b35e4474b05ce7",
            request:"60b4fd78fceeef63e42b495f",
        });
    
        const r2 = new Report({
            message:"ry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ip",
            author:"60ad24ae28b35e4474b05ce7",
            customer:"60b4fd78fceeef63e42b495d",
            request:"60b4fd78fceeef63e42b4962",
        });
    
        const r3 = new Report({
            message:"ry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ip",
            author:"60ad24ae28b35e4474b05ce7",
            customer:"60b4fd78fceeef63e42b495b",
            request:"60b4fd78fceeef63e42b495e",
        })
        Promise.all([r1.save(), r2.save(),r3.save()]).then(() => {
            console.log("r's  created");
          })
    })
    .catch((err) => {
            console.error(err);
          })