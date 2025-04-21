function tsp_hk(distance_matrix) {
    if(distance_matrix.length < 2) {return 0;}
    var cache = [];
    var cities = [];
    for (var i = 0; i < distance_matrix.length; i++) {
        cities.push(i);
    }

    function heldKarp(cities, start) {
        //if |cities| == 2: return length between those two cities
        if(cities.length == 2) {return distance_matrix[cities[0]][cities[1]];}

        //Check cache to see if this subset has been processed before
        var key = JSON.stringify(cities.sort());
        if(cache[key] === undefined) {cache[key] = [];}
        if(cache[key][start] !== undefined) {return cache[key][start];}
 
        //Get minimum for held-karp of the rest of the graph
        var min = Infinity;
        var trimmed = [...cities];
        trimmed.splice(trimmed.indexOf(start), 1);
        for(var i = 0; i < trimmed.length; i++) {
            var city = trimmed[i];
            min = Math.min(min, 
                heldKarp(trimmed, city) + distance_matrix[start][city]);
        }
        cache[key][start] = min;
        return min;
    }

    //|V| different start positions at beginning
    var min = Infinity;
    for(var i = 0; i < cities.length; i++) {
        min = Math.min(min, heldKarp(cities, cities[i]));
    }
    return min;
}