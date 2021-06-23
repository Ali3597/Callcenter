const {findAllTheAvailableWorkers,findAllTheOccupiedWorkers} = require ('../queries/workers.queries')


    
    waitForWorkers= async ()=>{
        let customer
        availableWorkers= await findAllTheAvailableWorkers()
        if (availableWorkers.length){
          theDAte=Date.now()
        availableWorkers.forEach(element => {
          if (element.lastHangUp<theDAte){
            theDAte=element.lastHangUp
            customer=element
          } 
        })
        return customer
      }
        else{
          occupiedWorkers= await findAllTheOccupiedWorkers()
          console.log(occupiedWorkers)
          if(!occupiedWorkers.length){
            customer=false
          }else{
            customer=true
          }
          return customer
    
        }
      }

      exports.chooseAWorker= async ()=>{
  
          customer =  await waitForWorkers()
          console.log("waiting")
          console.log(customer)
    
     return customer
    }

