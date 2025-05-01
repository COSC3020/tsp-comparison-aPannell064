function tsp_ls(distance_matrix) {
    //Generate basic route
    var route = [];
    for(var i=0; i < distance_matrix.length; i++) {route.push(i);}

    //Fisher–Yates shuffle
    var j;
    for(var i = distance_matrix.length-1; i >= 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [route[i], route[j]] = [route[j], route[i]];
    }

    //Find length
    var length = 0;
    for(var i = 0; i < route.length - 1; i++) {
        length += distance_matrix[route[i]][route[i+1]];
    }
    
    var newLength; 
    while(true) {
        newLength = localSearch(distance_matrix, route, length);
        //Stop when there is no more improvement
        if(length == newLength) {return length;}
        length = newLength;
    }
}

function twoOptSwap(route, i, k) {
    while(i<k) {[route[i++], route[k--]] = [route[k], route[i]];}
}

function localSearch(distance_matrix, route, length) {
    var newLength;
    for(var i = 0; i < route.length-2; i++) {
        for(var k = i+2; k < route.length; k++) {
            newLength = length;
            if(i > 0) {
                newLength -= distance_matrix[route[i-1]][route[i]];
                newLength += distance_matrix[route[i-1]][route[k]];
            }
            if(k < route.length-1) {
                newLength -= distance_matrix[route[k]][route[k+1]]; 
                newLength += distance_matrix[route[i]][route[k+1]];
            }
            if(newLength < length) {
                twoOptSwap(route, i, k); 
                return newLength;
            }
        }
    }
    return length;
}