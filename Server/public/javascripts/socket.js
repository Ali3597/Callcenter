

let nsSocket

const ioClient = io({
    reconnection: false,
  });
  
ioClient.on("connect", () => {
    console.log("connexion ok !");
})
// create the socket client side  depend on the id of the orker 
ioClient.on("workerId", (data) => {
  nsSocket = io(`/${data}`);
  nsSocket.on("call",(data)=>{
    getCall(data)
  })

  // Wait for the close call event to play the animation when a call is closed
  nsSocket.on("closeCall",(data)=>{
    
    closeCall()
    
  })

  
  // Wait for call event to play the animation when we get a  call  
  nsSocket.on("respond",()=>{
    console.log("papa")
    answerThePhone()
   
  })
})
 




// add event listenr on the close call butoon 
// and if we clci on it emit the close call event to close the call on the server sde too
function activateCloseCall() {
  decline = document.querySelector(".js-decline")
  decline.addEventListener("click",()=>{
    console.log("ouia ouais ouais ")
    console.log(nsSocket)
   nsSocket.emit("closeCall")

    closeCall()
  })
  
}

// just active all the event /animations when a call is closed
function closeCall(){
  console.log("on double close")
  right=document.querySelector(".call")
  fadeOut()
    right.innerHTML=""
    document.cookie = "callerNumber= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "callerId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  imNotOccupied()
}






