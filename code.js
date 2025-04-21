const { performance } = require('perf_hooks');
const writeXlsxFile = require('write-excel-file/node');
const fs = require('fs');
const fileName = 'data.txt';
eval(fs.readFileSync('tsp_hk.js')+'');

function tspTest() {
    var data = [];

    data.push([{value: 'Cities', fontWight: 'bold'}, 
        {value: 'HK Result', fontWight: 'bold'}, 
        {value: 'HK Time', fontWight: 'bold'},
        {value: 'LS Result', fontWight: 'bold'},
        {value: 'LS Time', fontWight: 'bold'}]);
    
    var dm = [];
    var startTime = performance.now();
    var hkResult = tsp_hk(dm);
    var hkTime = performance.now() - startTime;
    startTime = performance.now();
    var lsResult = 0;
    var lsTime = 0;
    data.push([{type: Number, value: dm.length}, 
        {type: Number, value: hkResult}, 
        {type: Number, value: hkTime}, 
        {type: Number, value: lsResult}, 
        {type: Number, value: lsTime}]); 
    

    while(dm.length < 0) {
        dm.push([]);
        for(var i = 0; i < dm.length; i++) {
            dm[dm.length-1].push(i == dm.length-1 ? 0 : Math.floor(Math.random() * 1000 + 1));
        }

        for(var j = 0; j < dm.length-1; j++) {
            dm[j].push(Math.floor(Math.random() * 1000 + 1));
        }
        
        startTime = performance.now();
        hkResult = tsp_hk(dm);
        hkTime = performance.now() - startTime;
        data.push([{type: Number, value: dm.length}, 
            {type: Number, value: hkResult}, 
            {type: Number, value: hkTime}, 
            {type: Number, value: lsResult}, 
            {type: Number, value: lsTime}]); 
    }
}


var data = tspTest();
writeXlsxFile(data, {fileName: 'data.xls'});