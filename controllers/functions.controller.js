




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
                return message
        }
       
}

exports.properStringDate = function(date) { 
       return date.toLocaleString()
       
}
