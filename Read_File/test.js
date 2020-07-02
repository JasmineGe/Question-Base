const fs = require('fs');
const path = require('path')
const rl = require('readline')
const assert  = require("assert");
var outputFilePath = './files/output_files'

// output data should same as data in model_output.txt
async function test() {    
    var myData = await readOutput()
    var modelData = await readModelOutput()
    
    for (var i=0; i< myData.length; i++) {
        assert.equal(myData[i], modelData[i]);
    }
}

function readOutput() {
    var my_data = [];
    return new Promise((resolve, reject) => {
        var myOutput = rl.createInterface({
            input: fs.createReadStream(path.join(outputFilePath, 'output.txt'))
        });
        
        myOutput.on('line', (line) => {
            my_data.push(line)
        });
        myOutput.on('close', () => {
            resolve(my_data);
        })
    })
}

function readModelOutput() {
    let model_data = []
    return new Promise((resolve, reject) => {
        var modelOutput = rl.createInterface({
            input: fs.createReadStream(path.join(outputFilePath, 'model_output.txt'))
        });
        modelOutput.on('line', (line) => {
            model_data.push(line)
        });
        modelOutput.on('close', () => {
            resolve(model_data);
        })
    })
}

test()
