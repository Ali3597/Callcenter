const {findAllTheAvailableWorkers,findAllTheOccupiedWorkers} = require ('../queries/workers.queries')
const {waitforme} = require (('../controllers/functions.controller'))

    
    waitForWorkers= async ()=>{
        let id
        availableWorkers= await findAllTheAvailableWorkers()
        if (availableWorkers.length){
          theDAte=Date.now()
        availableWorkers.forEach(element => {
          if (element.lastHangUp<theDAte){
            theDAte=element.lastHangUp
            id=element._id
          } 
        })
        return id
      }
        else{
          occupiedWorkers= await findAllTheOccupiedWorkers()
          if(!occupiedWorkers.length){
            id=false
          }else{
            id=true
          }
          return id
    
        }
      }

      exports.chooseAWorker= async ()=>{
      
        id=true
        while(id==true){
          await waitforme(3000)
          id =  await waitForWorkers()
          console.log("waiting")
          console.log(id)
    }
     return id
    }

