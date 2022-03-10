




exports.pageCalculator=  (itemNumber,itemByPage) => {
    return Math.ceil(itemNumber/itemByPage)
} 



exports.range = function(a, b, step) { 

    var range= [];

    if (typeof a == 'number'){

            range[0] = a;
            step = step || 1;
            while(a+step<= b){
                    range[range.length]= a+= step;
            }

    } else {

            var s = 'abcdefghijklmnopqrstuvwxyz';

            if (a === a.toUpperCase()) {
                    b = b.toUpperCase();
                    s = s.toUpperCase();
            }

            s = s.substring(s.indexOf(a), s.indexOf(b)+ 1);
            range = s.split('');        

    }

    return range;
}



exports.urgencyColor = function(urgencylevel) { 
        if (urgencylevel=="1"){
                return "#07FC1C"
        }else if (urgencylevel=="2"){
                return "#AFEC16"
        }else if (urgencylevel=="3"){
                return "#F3EF14"
        }else if (urgencylevel=="4"){
                return "#F86E14"
        }else if (urgencylevel=="5"){
                return "#F41E1E"
        }
}


exports.subMessage = function(limit,message) { 
        if (message.length>limit){
                
                return message.substring(0,limit) + "..." 
                
        }else{
                return message
        }
       
}

exports.properStringDate = function(date) { 
       return date.toLocaleString()
       
}


exports.deadlineTimeCalcul= (aDate,done)=>{
        if (done){
                duree= "Requete Validé"
        }else{
        dateNow= Date.now()
        ladate = Date.parse(aDate);
        diffDate= dateNow-ladate
        if (diffDate>0){
            seconds = Math.floor((diffDate / 1000) ) ;
            minutes = Math.floor(((diffDate / (1000*60))));
            hours   = Math.floor(((diffDate / (1000*60*60))));
            jour= Math.floor(hours/24)
            if (hours==0 && minutes==0){
                duree= "délai dépassé depuis "+seconds + " secondes"
            }else if (hours==0){
                duree= "délai dépassé depuis "+ minutes+ " minutes"
            }else if(hours<24){
                duree= "délai dépassé depuis "+hours+ " heure(s)"
            }else{
                duree= "délai dépassé depuis "+jour+ " jour(s)"
            }
        }else{
                diffDate=Math.abs(diffDate)      
                seconds = Math.floor((diffDate / 1000) ) ;
                minutes = Math.floor(((diffDate / (1000*60)) ));
                hours   = Math.floor(((diffDate / (1000*60*60)) ));
                jour= Math.floor(hours/24)  
                if (hours==0 && minutes==0){
                        duree= "Il reste "+seconds + " secondes"
                    }else if (hours==0){
                        duree= "Il reste"+ minutes+ " minutes"
                    }else if(hours<24){
                        duree= "Il reste"+hours+ " heure(s)"
                    }else{
                        duree= "Il reste"+jour+ " jour(s)"
                    }
        }
}
         
         return duree
    }


    exports.titleMessageOn = function(type,object) { 
        if (type=="requests"){
                if (object.length){
                        return "Requete(s) concernant le client"
                } else{
                        return "Il n'ya pour l'instant aucune requetes concernant le client "
                }
         } else if (type=="reports") {
                if (object.length){
                        return "Rapport(s) concernant la requete"
                } else{
                        return "Il n'ya pour l'instant aucun rapport pour cette requete"
                }
        }
        }
 
 

 exports.titleMessage= function(type,object) { 
        if (type=="customers"){
                if (object.length){
                        return "Clients"
                } else{
                        return "Il n'ya pour l'instant aucun  client "
                }
        } else if (type=="requests") {
                        if (object.length){
                        return "Requetes"
                        } else{
                                return "Il n'ya pour l'instant aucune requete"
                        }

        }else if (type=="requests") {
                if (object.length){
                        return "Rapport(s)"
                } else{
                        return "Il n'ya pour l'instant aucun rapports"
                }

        }else if (type=="calls") {
                
                        return "Mon journal d'appel"
                

        }
 }


 

exports.millisToMinutesAndSeconds=(millis)=> {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }