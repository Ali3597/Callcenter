const Customer = require("./models/customer.model")

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

    const c1 = new Customer({
        name: "ali",
        number: "123456",
        email:"aliC@hotmail.com",
    });

    const c2 = new Customer({
        name: "dany",
        number: "147852",
        email:"danyC@hotmail.com",
    });

    const c3 = new Customer({
        name: "ali",
        number: "369852",
        email:"ramyC@hotmail.com",
    });

    c1
      .save()
      .then((customer) => {
        console.log("c1 created");
        const request1 = new Request({
            message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            urgencyLevel: "1",
            typeof:"Call",
            deadline:Date.now() +( 60 * 60 * 24 * 1000)*30,
            author: "60ad24ae28b35e4474b05ce7",
            customer: customer._id,
        });
        const request2 =new Request({
            message:"that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various version",
            urgencyLevel: "4",
            typeof:"Call",
            deadline:Date.now() +( 60 * 60 * 24 * 1000)*4,
            author: "60ad24ae28b35e4474b05ce7",
            customer: customer._id,
        });
        Promise.all([request1.save(), request2.save()]).then(() => {
          console.log("c1's requests created");
        });
      })
      .catch((err) => {
        console.error(err);
      });

      c2
      .save()
      .then((customer) => {
        console.log("c2 created");
        const request1 = new Request({
            message:"that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various version",
            urgencyLevel: "3",
            typeof:"Call",
            deadline:Date.now() -( 60 * 60 * 24 * 1000)*4,
            author: "60ad24ae28b35e4474b05ce7",
            customer: customer._id,
        });
        const request2 =new Request({
            message:"that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versionL",
            urgencyLevel: "2",
            typeof:"Call",
            deadline:Date.now() +( 60 * 60 * 24 * 1000)*8,
            author: "60ad24ae28b35e4474b05ce7",
            customer: customer._id,
        });
        Promise.all([request1.save(), request2.save()]).then(() => {
          console.log("c2's requests created");
        });
      })
      .catch((err) => {
        console.error(err);
      });

      c3
      .save()
      .then((customer) => {
        console.log("c1 created");
        const request1 = new Request({
            message:" majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefo",
            urgencyLevel: "1",
            typeof:"Call",
            deadline:Date.now() +( 60 * 60 * 24 * 1000)*12,
            author: "60ad24ae28b35e4474b05ce7",
            customer: customer._id,
        });
        const request2 =new Request({
            message:"in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsu comes from a line in section 1.10.32",
            urgencyLevel: "5",
            typeof:"Call",
            deadline:Date.now() +( 60 * 60 * 24 * 1000),
            author: "60ad24ae28b35e4474b05ce7",
            customer: customer._id,
        });
        Promise.all([request1.save(), request2.save()]).then(() => {
          console.log("c3's requests created");
        });
      })
      .catch((err) => {
        console.error(err);
      })})
    