const { performance } = require('perf_hooks');
const XLSX = require('xlsx');

const fs = require('fs');

eval(fs.readFileSync('tsp_hk.js')+'');
eval(fs.readFileSync('tsp_ls.js')+'');

function tspTest() {
    var randomInt;

    //Make data for excel file and print out headers for testing
    var data = [['Cities', 'Held-Karp Result', 'Held-Karp Time', 'Local Search Result', 'Local Search Time']];
    console.log("Cities".padEnd(30) + 
        "HK Result".padEnd(30) + 
        "HK Time".padEnd(30) + 
        "LS Result".padEnd(30) + 
        "LS Time");
    
    var hkDone = false;
    var lsDone = false;
    var dm = [];
    fs.writeFileSync("DM.txt", JSON.stringify(dm));

    // Time initial input
    var startTime = performance.now();
    var hkResult = tsp_hk(dm);
    var hkTime = (performance.now() - startTime) / 1000;
    startTime = performance.now();
    var lsResult = tsp_ls(dm);
    var lsTime = (performance.now() - startTime) / 1000;
    data.push([dm.length, hkResult, hkTime, lsResult, lsTime]);
    console.log(String(dm.length).padEnd(30) + 
        String(hkResult).padEnd(30) + 
        String(hkTime).padEnd(30) + 
        String(lsResult).padEnd(30) +  
        lsTime);

    //Make excel sheet
    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");

    if(hkTime >= 3600) {
        hkDone = true;
        hkResult = null;
        hkTime = null;
    }
    if(lsTime >= 3600) {
        lsDone = true;
        lsResult = null;
        lsTime = null;
    }

    // Main loop to time both functions unless they are done
    while(!(hkDone && lsDone)) {
        dm.push([]);
        for(var i = 0; i < dm.length-1; i++) {
            randomInt = Math.floor(Math.random() * 1000 + 1);
            dm[dm.length-1].push(randomInt);
            dm[i].push(randomInt);
        }
        dm[dm.length-1].push(0);
        fs.writeFileSync("DM.txt", JSON.stringify(dm));
        
        if(!hkDone) {
            startTime = performance.now();
            hkResult = tsp_hk(dm);
            hkTime = (performance.now() - startTime) / 1000;
        }

        if(!lsDone) {
            startTime = performance.now();
            lsResult = tsp_ls(dm);
            lsTime = (performance.now() - startTime) / 1000;
        }

        // Update data and output
        data.push([dm.length, hkResult, hkTime, lsResult, lsTime]);
        console.log(String(dm.length).padEnd(30) + 
            String(hkResult).padEnd(30) + 
            String(hkTime).padEnd(30) + 
            String(lsResult).padEnd(30) +  
            lsTime);
        ws = XLSX.utils.aoa_to_sheet(data);
        wb.Sheets['Sheet1'] = ws;
        XLSX.writeFile(wb, "data.xlsx");

        if(hkTime >= 3600) {
            hkDone = true;
            hkResult = null;
            hkTime = null;
        }
        if(lsTime >= 3600) {
            lsDone = true;
            lsResult = null;
            lsTime = null;
        }
    }
}

tspTest();
