const mongoose = require("mongoose");

exports.clientPromise = mongoose
  .connect(
    `mongodb+srv://Callcenter:${process.env.MONGOPASSWORD}@cluster0.32oo2cv.mongodb.net/CallCenter?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connexion db ok !"))
  .catch((err) => console.log(err));

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://Callcenter:${process.env.MONGOPASSWORD}@cluster0.32oo2cv.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// exports.clientPromise = client.connect((err) => {
//   console.log("connexion db ok !");
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
