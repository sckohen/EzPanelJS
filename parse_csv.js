const csv = require('csv-parser')
const fs = require('fs')
const results = []

const reader = (path, callback) => {
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('error', function(err){
            console.error(err.message)
        })
        .on('end', () => {
           callback(results)
        })
}

module.exports = reader