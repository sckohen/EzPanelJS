var csv = require('./parse_csv')
var db = require('./database')
var panel = require('./extractPanel')

csv('raw.csv', (data) => {
    // For all of data
    // db.insertDataBulk('aek23', data)
})

panel.extractPanel("Emotional_Fitness_Panel", 'aek23', (response) => {
    console.log(response)
})


const geneticsTable = {'rsid':'VARCHAR(20)  PRIMARY KEY UNIQUE', 'chromosome':'VARCHAR(2)',
    'position':'VARCHAR(9)', 'genotype':'VARCHAR(2)'}
// db.createTable('aek23', geneticsTable)

const variantsTable = {'rsid':'VARCHAR(20) PRIMARY KEY UNIQUE', 'gene':'VARCHAR(20)', 'variant':'VARCHAR(20)'}
// db.createTable('gene_variant', variantsTable)

const panelsTable = {'panel_id':'int(11) PRIMARY KEY UNIQUE', 'panel_name':'VARCHAR(50) NOT NULL'}
// db.createTable('panels', panelsTable)

const panelrsTable = {'panel_id':'int(11) NOT NULL', 'rsid':'VARCHAR(20) NOT NULL'}
// db.createTable('panel_rs', panelrsTable)