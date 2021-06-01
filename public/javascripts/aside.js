
window.addEventListener('DOMContentLoaded', ()=>{
  
    tabsCenter()
    
    
    setTimeout(getCall(), 1000)
  
  


})


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}




function tabsCenter() {
    const content = document.querySelector(".MainContent")
    tabsAside= document.querySelectorAll(".aside-bottom li")
    tabsAside.forEach(tabAside=>{
        tabAside.addEventListener("click",()=>{
            tabTitleElement = tabAside.querySelector("h3").innerHTML.toLowerCase()
            axios.get('/dashboard/' +tabTitleElement ,)
            .then( response => {
            tabRemoveAddBlue(tabsAside,tabAside)
            content.innerHTML=response.data
            consult()
            // if (tabTitleElement=="customers"){
            //   linkCustomerProfile(content) 
            // }
            showForm(tabTitleElement)
            })
            .catch( err => {
              console.log(err);
            })       
        })
    })
}

function consult(){
  consultButtons= document.querySelectorAll("#consult")
  typeOfTab= document.querySelector("table").getAttribute("type")

  consultButtons.forEach(consultButton=>{
    consultButton.addEventListener("click",()=>{
      idItem= consultButton.parentNode.getAttribute("id")
      console.log(idItem)
      axioxProfile(idItem,typeOfTab)
    })
   
})

}


function axioxProfile(idItem,typeOfTab){
  content = document.querySelector(".MainContent")
  console.log("axiosss")
  console.log(typeof(idItem))
  axios.get('/dashboard/' +typeOfTab +'/profil/' + idItem)
    .then( response => {
      content.innerHTML= response.data
    })
    .catch( err => {
      console.log(err);
    })  
}







function tabRemoveAddBlue(tabsAside,tabAside) {
  console.log("on est la ")
    tabsAside.forEach(tab=>{
        if (tab.classList.contains("blue")){
            tab.classList.remove("blue")
        }
})
tabAside.classList.add("blue")
}











function goBacktoNormal(tabTitleElement) {
  const content = document.querySelector(".MainContent")
  axios.get('/dashboard/' +tabTitleElement ,)
            .then( response => {
            content.innerHTML=response.data
            showForm(tabTitleElement)
            })
            .catch( err => {
              console.log(err);
            })     
}



function showForm(tabTitleElement) {
  const content = document.querySelector(".MainContent")
  buttonForm = document.querySelector(".myButtonCreate")
  buttonForm.addEventListener("click", ()=>{
    axioxForm(tabTitleElement,content)
  })

}

function axioxForm(tabTitleElement,content) {
axios.get('/dashboard/' +tabTitleElement +'/form' )
    .then( response => {
      content.innerHTML= response.data
      sendFormInfo(tabTitleElement)
    })
    .catch( err => {
      console.log(err);
    })  
  }




  function sendFormInfo(tabTitleElement) {
    form= document.querySelector("#sendNew")
    console.log("ici")
    form.addEventListener("click",()=>{
        arrayValue=[]
      formlists=  form.parentNode.querySelectorAll("li input")
      formlists.forEach(formlist=>{
        console.log(formlist.value)
        arrayValue.push(formlist.value)     
      })
      console.log(arrayValue)
      axios.post('/dashboard/' +tabTitleElement +'/new' ,{arrayValue})
        .then( response => {
           if( response.data.hasOwnProperty('error')){
                error= document.querySelector(".formError")
                error.innerHTML=response.data.error
           }else{
            goBacktoNormal(tabTitleElement)
           }                    
        })
        .catch( err => {
          console.log(err);
        })       
    })
}


function getCall(number="123456") {
  const content = document.querySelector(".MainContent")
  right= document.querySelector(".call")
 console.log(number)
  axios.post('/dashboard/call' ,{number})
        .then( response => {
          right.innerHTML=response.data
          fadeIn()
          ringPhone()
          answerThePhone()
          closeCall(right)
          console.log(document.cookie)
          if (getCookie("callerId")=="unknow"){
            console.log("pas call")
            newClient()
          }else{
            console.log("call")
            clientWeKnow()
          }
        })
        .catch( err => {
          console.log(err);
        })      

}

function clientWeKnow() {
  answer = document.querySelector(".js-accept")
  answer.addEventListener("click",()=>{
    console.log("okkkbbbbbbbbbb")
    content = document.querySelector(".MainContent")
    customerstab=document.querySelector(".aside-bottom ul li:nth-child(2) ")
    tabsAside= document.querySelectorAll(".aside-bottom li")
    tabRemoveAddBlue(tabsAside,customerstab)
    console.log("c'est lideee")
    console.log(getCookie("callerId"))
    console.log("ihigih")
    idItem=getCookie("callerId")
    idItem = idItem.replace(/^"(.*)"$/, '$1');
  
    axioxProfile(idItem,"customers")
  })
  
}




function newClient() {
  answer = document.querySelector(".js-accept")
  answer.addEventListener("click",()=>{
    content = document.querySelector(".MainContent")
    customerstab=document.querySelector(".aside-bottom ul li:nth-child(2) ")
    tabsAside= document.querySelectorAll(".aside-bottom li")
    tabRemoveAddBlue(tabsAside,customerstab)
    axioxForm("customers",content)
  })
  
}






function fadeIn() {
  centerPart =document.querySelector(".theCenter")
  callPart=document.querySelector(".call")
  callPart.classList.add("show")
  centerPart.classList.add("withcall")
}

function fadeOut() {
  centerPart =document.querySelector(".theCenter")
  callPart=document.querySelector(".call")
  callPart.classList.remove("show")
  centerPart.classList.remove("withcall")

}

function ringPhone() {
  mp3= document.querySelector("#telephoneRing")
  mp3.play()
 

}
function stopingPhone() {
  mp3= document.querySelector("#telephoneRing")
  mp3.pause
  mp3.src=mp3.src

}

function answerThePhone() {
  accept = document.querySelector(".js-accept")
  accept.addEventListener("click",()=>{
    animationAnswer()
    setCounter()
    actions= document.querySelector(".Card-actions")
    callInfo = document.querySelector(".js-callInfo")
    actions.innerHTML=`<div class="Card-action js-decline" >
    <div class=" Card-actionButton Card-actionButton--decline">
      </div>
        </div>
  `
  
    callInfo.innerHTML="En cours"
    actions= document.querySelector(".Card-actions")
    closeCall(right)
   
  })
}

function animationAnswer() {
  card= document.querySelector(".Card")
  cardProfile= document.querySelector(".Card-imageCallEffect")
  card.classList.remove("shaking")
  cardProfile.classList.add("respond")
}


function closeCall(right) {
  
  decline = document.querySelector(".js-decline")
  decline.addEventListener("click",()=>{
    fadeOut(callPart,centerPart)
    right.innerHTML=""
    document.cookie = "callerNumber= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "callerId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    console.log(document.cookie)
  })
  
}




function setCounter() {

  insertTimer= document.querySelector(".timer")
  second=0
  minute=0
  secondsCounter = setInterval(function () {
    second+=1
    if (second==60){
       minute+=1
      second=0
    }
    if (second<10){
      secondString="0"+second
    }else{
      secondString=second
    }
    if (minute<10){
      minuteString="0"+minute
    }else{
      minuteString=minute
    }
    timer = minuteString + ":" + secondString
    insertTimer.innerHTML =timer
  }, 1000);

}



// function linkCustomerProfile(content) {
//   links = document.querySelectorAll("#customerNameProfile")
//   console.log(links)
//   links.forEach(link=>{
//     console.log(link)
//     link.addEventListener("click",()=>{
//       axios.get('/dashboard/customers/' +link.innerHTML ,)
//             .then( response => {
//               content.innerHTML=response.data

//             // tabRemoveAddBlue(tabsAside,tabAside)
//             // content.innerHTML=response.data
//             // showForm(tabTitleElement)

            

//             })
//             .catch( err => {
//               console.log(err);
//             })   
//     })

// })
// }