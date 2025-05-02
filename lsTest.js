const { performance } = require('perf_hooks');
const XLSX = require('xlsx');
const fs = require('fs');

eval(fs.readFileSync('tsp_ls.js')+'');

function lsTest() {
    var randomInt;
    // Get data in exel file
    var wb = XLSX.readFile('data.xlsx');
    var sheetName = wb.SheetNames[0];
    var ws = wb.Sheets[sheetName];
    var data = XLSX.utils.sheet_to_json(ws, {header: 1});
    if(!data.length) {data = [];}


    //Pick up where left off
    var dm = JSON.parse(fs.readFileSync("DM.txt", 'utf8'));
    var startTime = performance.now();
    var lsResult = tsp_ls(dm);
    var time = (performance.now() - startTime) / 1000;
    data.push([dm.length, null, null, lsResult, time]);
    console.log(String(dm.length).padEnd(30) +
        String(lsResult).padEnd(30) +
        time);

    ws = XLSX.utils.aoa_to_sheet(data);
    wb.Sheets[sheetName] = ws;
    XLSX.writeFile(wb, "data.xlsx");

    // Test until time is over an hour
    while(time < 3600) {
        // Increase input size by 500
         do
         {
            dm.push([]);
            for(var i = 0; i < dm.length-1; i++) {
                randomInt = Math.floor(Math.random() * 1000 + 1);
                dm[dm.length-1].push(randomInt);
                dm[i].push(randomInt);
            }
            dm[dm.length-1].push(0);
        } while (dm.length % 500)

        // Test
        startTime = performance.now();
        lsResult = tsp_ls(dm);
        time = (performance.now() - startTime) / 1000;

        // Update data and output
        data.push([dm.length, null, null, lsResult, time]);
        console.log(String(dm.length).padEnd(30) +
            String(lsResult).padEnd(30) +
            time);
        ws = XLSX.utils.aoa_to_sheet(data);
        ws = XLSX.utils.aoa_to_sheet(data);
        wb.Sheets[sheetName] = ws;
        XLSX.writeFile(wb, "data.xlsx");
    }
}

lsTest();
