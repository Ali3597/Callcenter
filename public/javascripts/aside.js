window.addEventListener('DOMContentLoaded', ()=>{
    tabsCenter()
    


})


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
            showForm(tabTitleElement)

            

            })
            .catch( err => {
              console.log(err);
            })       
        })
    })
}

function tabRemoveAddBlue(tabsAside,tabAside) {
    tabAside.classList.add("blue")
    tabsAside.forEach(tab=>{
        if (tab.classList.contains("blue")){
            tab.classList.remove("blue")
        }
})
}


function sendFormInfo(tabTitleElement) {
    const center = document.querySelector(".theCenter")
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


    axios.get('/dashboard/' +tabTitleElement +'/form' )
    .then( response => {
      content.innerHTML= response.data
      sendFormInfo(tabTitleElement)
    })
    .catch( err => {
      console.log(err);
    })  


  })




}