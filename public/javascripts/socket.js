const ioClient = io({
    reconnection: false,
  });
  
  ioClient.on("connect", () => {
    console.log("connexion ok !");
  });