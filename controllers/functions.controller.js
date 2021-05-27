




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