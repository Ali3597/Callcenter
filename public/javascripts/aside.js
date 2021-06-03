
window.addEventListener('DOMContentLoaded', ()=>{
    consult()
    tabsCenter()
    closeModal()
    stopPropagationModal()
    console.log(window.location)

    // setTimeout(getCall(), 1000)

})


function urlView(){}


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
    const tabsAside= document.querySelectorAll(".aside-bottom li")
    tabsAside.forEach(tabAside=>{
        tabAside.addEventListener("click",()=>{
            tabTitleElement = tabAside.querySelector("h3").innerHTML.toLowerCase()
            axios.get('/dashboard/' +tabTitleElement ,)
            .then( response => {
            tabRemoveAddBlue(tabAside)
            content.innerHTML=response.data
            consult()
            showForm(tabTitleElement)
            })
            .catch( err => {
              console.log(err);
            })       
        })
    })
}


function giveYouTheRightTab(tab){
  if (tab=="home"){
    return document.querySelector(".aside-bottom li:nth-child(1)")
  }else if (tab=="customers"){
    return  document.querySelector(".aside-bottom li:nth-child(2)")

  }else if (tab=="requests"){
    return   document.querySelector(".aside-bottom li:nth-child(3)")
    
  }else if (tab=="reports"){
    return  document.querySelector(".aside-bottom li:nth-child(4)")
    
  }
}

function consult(){
  consultButtons= document.querySelectorAll("#consult")
  typeOfTab= document.querySelector("table").getAttribute("type")

  consultButtons.forEach(consultButton=>{
    consultButton.addEventListener("click",()=>{
      idItem= consultButton.parentNode.getAttribute("id")

      axioxProfile(idItem,typeOfTab)

    })
   
})

}


function axioxProfile(idItem,typeOfTab){
  content = document.querySelector(".MainContent")
  axios.get('/dashboard/' +typeOfTab +'/profil/' + idItem)
    .then( response => {
     
      content.innerHTML= response.data
      showModal()
      tabRemoveAddBlue(giveYouTheRightTab(typeOfTab))
      consult()
    })
    .catch( err => {
      console.log(err);
    })  
}







function tabRemoveAddBlue(tabAside) {
  const tabsAside= document.querySelectorAll(".aside-bottom li")
    tabsAside.forEach(tab=>{
        if (tab.classList.contains("blue")){
            tab.classList.remove("blue")
        }
})
tabAside.classList.add("blue")
}













function showForm(tabTitleElement) {
  buttonForm = document.querySelector("#showForm")
  buttonForm.addEventListener("click", ()=>{
    axioxForm(tabTitleElement)
  })

}

function axioxForm(tabTitleElement) {
  content = document.querySelector(".MainContent") 
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
    const content = document.querySelector(".MainContent")
    errorpara= document.querySelector(".formError")
    formButton= document.querySelector("#sendNew")
    formButton.addEventListener("click",()=>{
        arrayValue=[]
      formlists=  formButton.parentNode.querySelectorAll("li input,select")
      formlists.forEach(formlist=>{
        arrayValue.push(formlist.value)     
      })

      axios.post('/dashboard/' +tabTitleElement +'/new' ,{arrayValue})
        .then( response => {
          console.log(response)
          console.log(response.data)
            content.innerHTML= response.data        
            consult()        
        })
        .catch( err => {
          errorpara.innerHTML= "Erreur dans le formulaire"
        })       
    })
}

function getCall(number="123456") {
  const content = document.querySelector(".MainContent")
  right= document.querySelector(".call")
  axios.post('/dashboard/call' ,{number})
        .then( response => {
          right.innerHTML=response.data
          fadeIn()
          ringPhone()
          answerThePhone()
          closeCall(right)
          if (getCookie("callerId")=="unknow"){
            newClient()
          }else{
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
    content = document.querySelector(".MainContent")
    customerstab=document.querySelector(".aside-bottom ul li:nth-child(2) ")
    tabRemoveAddBlue(customerstab)
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
    tabRemoveAddBlue(customerstab)
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


function stopPropagationModal() {
  modalWrapper = document.querySelector(".modal-wrapper")
  modalWrapper.addEventListener("click",(e)=>{
    e.stopPropagation()
  })
}



function showModal() {
 buttonsOpenModal= document.querySelectorAll(".Action")
 ValidModal= document.querySelector("#ValidModal")
 modal = document.querySelector(".modal")
 paragraphModal= document.querySelector(".modal-wrapper p")
 buttonsOpenModal.forEach(element=>{
 element.addEventListener("click",(e)=>{
  e.stopPropagation()
  ValidModal.addEventListener("click",()=> {
    modal.classList.remove("active")
    removeAllEventListeners(ValidModal)
  
  })
  action = element.getAttribute("Action")
  item= element.parentNode.getAttribute("id")
  type = element.parentNode.getAttribute("type")
  paragraphModal.innerHTML=chooseModalMessage(action,type)
  modal.classList.add("active")
  eventListenerOnValidModal(action,item,type)
 })
})

function chooseModalMessage(action,type){
  if(type =="customers"){
    if (action=="delete"){
      return "Etes vous sur de vouloir supprimer ce client ? Cette action sera irreversible "
    }
  }else if (type =="requests"){
    if (action=="delete"){
      return "Etes vous sur de vouloir supprimer cette requete ? Cette action sera irreversible "
    }else if (action=="undone"){
      return "Etes vous sur de vouloir unvalider cette requete ?  "
    } else if (action=="done"){
      return "Etes vous sur de vouloir valider cette requete ? "
    }
  }else if (type =="reports"){
    if (action=="delete"){
      return "Etes vous sur de vouloir supprimer ce rapport ? Cette action sera irreversible "
    }
  }

}

}
function eventListenerOnValidModal (action,item,type) {
  ValidModal= document.querySelector("#ValidModal")
  ValidModal.addEventListener("click",()=>{
    axioxModal(action,item,type)
    
  })
 } 

function  axioxModal (action,item,type){

  axios.get('/dashboard/' +type +'/'+action +'/' + item)
    .then( response => {
      content.innerHTML= response.data
      showModal()
      consult()
    })
    .catch( err => {
      console.log(err);
    })  



}




function removeAllEventListeners(object){
old_element = object
new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);
}

function closeModal() {
  modal = document.querySelector(".modal")
  crossModal = document.querySelector(".fa-times-circle")
  cancelModal = document.querySelector("#canceModal")
  ValidModal= document.querySelector("#ValidModal")
  window.addEventListener("click",()=> {
    if (modal.classList.contains("active")){
      modal.classList.remove("active")
      removeAllEventListeners(ValidModal)
    }
  })
  crossModal.addEventListener("click",()=> {
      modal.classList.remove("active")
      removeAllEventListeners(ValidModal)
    
  })
cancelModal.addEventListener("click",()=> {
  modal.classList.remove("active")
  removeAllEventListeners(ValidModal)

})




}





