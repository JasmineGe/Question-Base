const fs = require('fs');
const path = require('path')
const rl = require('readline')
var moment = require('moment')
var inputFilePath = './files/input_files'
var outputFilePath = './files/output_files'
var result = []
var sex_map = {
    'F': 'Female',
    'M': 'Male'
}

fs.readdir(inputFilePath, async (err, dir) => {
    if (err) throw err;
    for (let fileName of dir) {
        var fileData = await readFile(fileName)
        
        result = result.concat(fileData)
    }
    // console.log(JSON.stringify(result, null, 2))
    var output1 = result.sort((a, b) => {
        if (a.sex > b.sex) return 1
        if (a.sex < b.sex) return -1
        if (a.lastName > b.lastName) return 1
        if (a.lastName < b.lastName) return -1
        return 0
    })
    .map((obj) => {
        return `${obj.lastName} ${obj.firstName} ${obj.sex} ${obj.date} ${obj.color}`
    })
    .join('\r\n')

    var output2 = result.sort((a, b) => {
        if (moment(a.date, 'M/D/YYYY').isBefore(moment(b.date, 'M/D/YYYY'))) return -1
        if (moment(a.date, 'M/D/YYYY').isAfter(moment(b.date, 'M/D/YYYY'))) return 1
        if (a.lastName > b.lastName) return 1
        if (a.lastName < b.lastName) return -1
        return 0
    })
    .map((obj) => {
        return `${obj.lastName} ${obj.firstName} ${obj.sex} ${obj.date} ${obj.color}`
    })
    .join('\r\n')

    var output3 = result.sort((a, b) => {
        if (a.lastName > b.lastName) return -1
        if (a.lastName < b.lastName) return 1
        return 0
    })
    .map((obj) => {
        return `${obj.lastName} ${obj.firstName} ${obj.sex} ${obj.date} ${obj.color}`
    })
    .join('\r\n')

    fs.writeFile(path.join(outputFilePath, 'output.txt'), `Output 1:\r\n${output1}\n\nOutput 2:\r\n${output2}\n\nOutput 3:\r\n${output3}`, (err) => {
        if (err) throw err;
    })
})

function readFile(fileName) {
    let data = []
    return new Promise((resolve, reject) => {
        var myInterface = rl.createInterface({
            input: fs.createReadStream(path.join(inputFilePath, fileName))
        });
        
        var el 
        myInterface.on('line', (line) => {
            switch(fileName) {
                case 'comma.txt': 
                    el = line.split(',')
                    data.push({
                        lastName: el[0].trim(),
                        firstName: el[1].trim(),
                        sex: el[2].trim(),
                        color: el[3].trim(),
                        date: el[4].trim()
                    });
                    break;
                case 'pipe.txt': 
                    el = line.split('|')
                    data.push({
                        lastName: el[0].trim(),
                        firstName: el[1].trim(),
                        other: el[2].trim(),
                        sex: sex_map[el[3].trim()],
                        color: el[4].trim(),
                        date: moment(el[5].trim(), 'M-D-YYYY').format('M/D/YYYY')
                    });
                    break;
                case 'space.txt': 
                    el = line.split(' ')
                    data.push({
                        lastName: el[0],
                        firstName: el[1],
                        other: el[2],
                        sex: sex_map[el[3]],
                        date: moment(el[4], 'M-D-YYYY').format('M/D/YYYY'),
                        color: el[5]
                    });
                    break;
                default: 
                    console.log(`Unknown fileName ${fileName}`); 
                    break
            }
        });

        myInterface.on('close', () => {
            resolve(data);
        })
    })
}

