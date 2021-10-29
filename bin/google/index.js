const { GoogleSpreadsheet } = require('google-spreadsheet');
const { writeFile } = require('fs');

async function run() {
    const doc = new GoogleSpreadsheet('1f0Shxx6gJFh8rkNHuyBlRZdH6LehONXZ055OTMrzOg8');
    await doc.useApiKey(process.env.GOOGLE_PERSONAL);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    // const header = await sheet.loadHeaderRow();
    const rows = await sheet.getRows();

    let data = [];
    for (const i in rows) {
        let o = {};
        for (const key in rows[i]){
            if (key.charAt(0) !== '_'){
                o[key] = rows[i][key];
            }  
        }
        data.push(o);
    }

    writeFile('./src/projects.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

run();