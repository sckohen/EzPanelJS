var csv = require('./parse_csv')
var db = require('./database')

csv((data) => {
    // For all of data
     db.insertDataBulk('aek23', data)
})


const geneticsTable = {'rsid':'VARCHAR(20)  PRIMARY KEY UNIQUE', 'chromosome':'VARCHAR(2)',
    'position':'VARCHAR(9)', 'genotype':'VARCHAR(2)'}
// db.createTable('aek23', geneticsTable)

