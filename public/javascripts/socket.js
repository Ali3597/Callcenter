let nsSocket
const ioClient = io({
    reconnection: false,
  });
  

  ioClient.on("connect", () => {
    console.log("connexion ok !");
   
   
})

ioClient.on("workerId", (data) => {
  nsSocket = io(`/${data}`);
  nsSocket.on("call",(data)=>{
    getCall(data)
  })

  nsSocket.on("closeCall",(data)=>{
    console.log("on close le callll")
    closeCall()
  })

})
 





function activateCloseCall() {
  console.log()
  decline = document.querySelector(".js-decline")
  decline.addEventListener("click",()=>{
    console.log("ouia ouais ouais ")
    console.log(nsSocket)
   nsSocket.emit("closeCall")

    closeCall()
  })
  
}

function closeCall(){
  console.log("on double close")
  right=document.querySelector(".call")
  fadeOut()
    right.innerHTML=""
    document.cookie = "callerNumber= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "callerId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}
