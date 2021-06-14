
const ioClient = io({
    reconnection: false,
  });
  

  ioClient.on("connect", () => {
    console.log("connexion ok !");
    const nsSocket = io(`/`);


    nsSocket.on("call", (data) => {
      getCall(data)
    })
   
})

