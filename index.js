var csv = require('./parse_csv')
var db = require('./database')

csv((data) => {
    // For all of data
     db.insertDataBulk('aek23', data)
    /*data.map((item, index) => {
        // For each line
        if (index % 10000 === 0) {
            // Per 10000 lines
            // db.insertData('aek23', item)
        }
    })*/
// const authors = {"id":"int  PRIMARY KEY UNIQUE", "name":"string", "surname":"string"}
//db.createTable('aek23', genetics)
})


const genetics = {'rsid':'TEXT  PRIMARY KEY UNIQUE', 'chromosome':'TEXT',
    'position':'NUMERIC', 'genotype':'TEXT'}

const rs7198969 = {"id":"rs7198969", "chromosome":"16",
    "position":"80951306", 'genotype':'AC'}
const rs7198971 = {"id":"rs7198971", "chromosome":"16",
    "position":"80951306", 'genotype':'AC'}
    //db.insertData('aek23', rs7198969)
    //db.insertData('aek23', rs7198971)

