
window.addEventListener('DOMContentLoaded', ()=>{
    consult()
    tabsCenter()
    closeModal()
    stopPropagationModal()
    changePage("home")
    makeYouAvailable()
 

    // setTimeout(function() {
    //   imOccupied()}, 3000)

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




function whichProfileActivate( table,item){
  if (table=="customers"){
    activateProfileCustomers(item)
  }else if (table=="requests"){
    activateProfileRequests(item)
  }else if (table=="reports"){
    activateProfileReports()
  }
}


function whichTableActivate( table){
  if (table=="customers"){
    activateTableCustomers()
  }else if (table=="requests"){
   activateTableRequests()
  }else if (table=="reports"){
    activateTableReports()
  }else if (table=="home"){
   activateTableHome()
  }else if (table=="calls"){
    activateTableCalls()
  }
}


function activateProfileCustomers(item){
  consult()
  makeCall()
  showModal()
  showForm("requests",item)
  changePageOnProfile("customers")
}



function activateProfileRequests(item){
  consult()
  makeCall()
  showModal()
  showForm("reports",item)
  
}




function activateProfileReports(){
  consult()
  
}


function activateTableHome(){
  consult()
  changePage("home")
  
}

function activateTableCalls(){
  consult()
  changePage("calls")
  
}

function activateTableCustomers(){
  consult()
  makeCall()
  showForm("customers")
  search("customers")
  changePage("customers")
  
}


function activateTableRequests(){
  consult()
  makeCall()
  showForm("requests")
  
  changePage("requests")
  
}




function activateTableReports(){
  consult()
  
}






function transitionInnerHtml( response,time) {
  const content = document.querySelector(".MainContent")
  content.style.opacity=0
   setTimeout(function() {
    content.innerHTML=response
    content.style.opacity=1
      }, time)
}

function tabsCenter() {
    const tabsAside= document.querySelectorAll(".aside-bottom li")
    tabsAside.forEach(tabAside=>{
        tabAside.addEventListener("click",()=>{
            tabTitleElement = tabAside.querySelector("h3").innerHTML.toLowerCase()
            axios.get('/dashboard/' +tabTitleElement + '/1' ,)
            .then( response => {
              time=150
            tabRemoveAddBlue(tabAside)
           transitionInnerHtml(response.data,time)
           setTimeout(function() {
             console.log(tabTitleElement)
            whichTableActivate( tabTitleElement)
              }, time)
            })
            .catch( err => {
              console.log(err);
            })       
        })
    })
}
 
function newElementOn(tabTitleElement){
  if (tabTitleElement=="customers"){
    return "requests"

  }else if(tabTitleElement=="requests"){
    return "reports"
  }
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

      axioxProfile(idItem,typeOfTab,1)

    })
   
})

}


function axioxProfile(idItem,typeOfTab,page){
  
  axios.get('/dashboard/' +typeOfTab +'/profil/' + idItem+'/'+page)
    .then( response => {
      time=150
      tabRemoveAddBlue(giveYouTheRightTab(typeOfTab))
      transitionInnerHtml(response.data,time)
      setTimeout(function() {
        whichProfileActivate(typeOfTab,idItem)
          }, time)
     
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













function showForm(tabTitleElement,item) {

  buttonForm = document.querySelector("#showForm")
  buttonForm.addEventListener("click", ()=>{
    axioxForm(tabTitleElement,item)
  })

}

function axioxForm(tabTitleElement,item) {

axios.post('/dashboard/' +tabTitleElement +'/form',{item} )
    .then( response => {
      time=150
      transitionInnerHtml(response.data,time)
      
      setTimeout(function() {
        sendFormInfo(tabTitleElement)
          }, time)
      
    })
    .catch( err => {
      console.log(err);
    })  
  }




  function sendFormInfo(tabTitleElement) {
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
          time=150
          transitionInnerHtml(response.data,time)
          setTimeout(function() {
            alert(DetermineMessage(tabTitleElement,"new" ))     
            whichTableActivate(tabTitleElement)  
              }, time)    
        })
        .catch( err => {
          errorpara.innerHTML= "Erreur dans le formulaire"
        })       
    })
}

function getCall(number) {
  console.log("si senor")
  console.log(number)
  right= document.querySelector(".call")
  axios.post('/dashboard/getcall' ,{number})
        .then( response => {
          right.innerHTML=response.data
          fadeIn()
          ringPhone()
          activateCloseCall()
          console.log(getCookie("callerId"))
        })
        .catch( err => {
          console.log(err);
        }) 
        imOccupied()     

}



 function activateClientWeKnow( ){
  customerstab=document.querySelector(".aside-bottom ul li:nth-child(2) ")
  tabRemoveAddBlue(customerstab)
  idItem=getCookie("callerId")
  idItem = idItem.replace(/^"(.*)"$/, '$1');

  axioxProfile(idItem,"customers")
 }


function newClient() {
  
    content = document.querySelector(".MainContent")
    customerstab=document.querySelector(".aside-bottom ul li:nth-child(2) ")
    tabRemoveAddBlue(customerstab)
    axioxForm("customers",content)

  
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
  if (getCookie("callerId")=="unknow"){
    console.log("watcha")
    newClient()
  }else{
    console.log("client we know")
       activateClientWeKnow()
  }
  
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
    activateCloseCall() 
}

function animationAnswer() {
  card= document.querySelector(".Card")
  cardProfile= document.querySelector(".Card-imageCallEffect")
  card.classList.remove("shaking")
  cardProfile.classList.add("respond")
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
      time=150
      transitionInnerHtml(response.data)
      setTimeout(function() {
        alert(DetermineMessage(type,action ))
        whichProfileActivate(type)
          }, time)
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




function DetermineMessage(type,action ) {

if(type =="customers"){
    if (action=="delete"){
      return "Le client a bien été supprimé"
    }else if (action=="new"){
      return "le client  a bien été creer "
    }
  }else if (type =="requests"){
    if (action=="delete"){
      return "La requete a bien été supprimé "
    }else if (action=="undone"){
      return "La requete a bien été invalider  "
    } else if (action=="done"){
      return "La requete a bien été valider "
    }else if (action=="new"){
      return "la Requete a bien été creer "
    }
  }else if (type =="reports"){
    if (action=="delete"){
      return "Ce rapport a  bien été supprimer "
    }else if (action=="new"){
      return "le rapport a bien été creer "
    }
  }

  
}

function alert(message) {
  alertP= document.querySelector(".alertMessage")

  alertP.innerHTML=message
  alertP.classList.add("active")
  setTimeout(function(){
    alertP.classList.remove("active")}
    , 3000)
}




function makeCall(){
  callElements = document.querySelectorAll(".makeCall")
  right= document.querySelector(".call")
  callElements.forEach(callElement=>{
    callElement.addEventListener("click",()=>{
      number=callElement.querySelector(":first-child").innerHTML
      axios.post('/dashboard/makecall' ,{number})
        .then( response => {
          right.innerHTML=response.data
          fadeIn()
          activateCloseCall()
          activateClientWeKnow()
            setTimeout(function() {clientAnswer()
      }, 5000)
          
        })
        .catch( err => {
          console.log(err);
        })      
      
    })
    
  })

}


function clientAnswer(){
  animationAnswer()
  setCounter()
  callInfo = document.querySelector(".js-callInfo")
  callInfo.innerHTML="En cours"
}



function search(table){
  buttonSearch = document.querySelector(".searchButton")
 content = document.querySelector(".MainContent")
  buttonSearch.addEventListener("click",()=>{
    console.log("on cherche ")
    searchValue=  buttonSearch.parentNode.querySelector("input").value
    axios.post('/dashboard/' +table +'/search',{searchValue})
    .then( response => {
      content.innerHTML=response.data
      whichTableActivate(table)

    })
    .catch( err => {
      console.log(err);
    }) 
      


  })
   
}



function changePage(tabTitleElement){
  pages = document.querySelectorAll(".pagination-page-number")


  pages.forEach(page=>{
  page.addEventListener("click",()=>{
   
    axios.get('/dashboard/' +tabTitleElement + '/'+ page.innerHTML ,)
    .then( response => {
      time=150
   transitionInnerHtml(response.data,time)
   setTimeout(function() {
    whichTableActivate( tabTitleElement)
      }, time)
    })
    .catch( err => {
      console.log(err);
    })       

  })
})


}



function changePageOnProfile(tabTitleElement){
  pages = document.querySelectorAll(".pagination-page-number")
  idItem= document.querySelector(".profileButton").getAttribute("id")
  pages.forEach(page=>{
  page.addEventListener("click",()=>{
   axioxProfile(idItem,tabTitleElement,page.innerHTML)
  })
})


}


function makeYouAvailable(){
availableSwitch = document.querySelector(".slider")
availableSwitch.addEventListener("click",(e)=>{
  e.stopPropagation()
  axios.post('/workers/availableUpdate')
  .then( response => {
  })
  .catch( err => {
    console.log(err);
  })       

})





}



function imOccupied(){
  availibility = document.querySelector(".occupied div")
  availibility.innerHTML=`<span> occupied </span>`
  console.log("occupied")
 }
 
 function imNotOccupied(){
   availibility = document.querySelector(".occupied div")
   availibility.innerHTML=` <label class="switch" > 
   <input type='checkbox' checked >
           <span class= "slider round">  </span>
   
   </label>
           `
           console.log(" not occupied")
  }