const db = require('./database')
const csv = require('./parse_csv')

const new_genetics_table = (table_name) =>{
    const geneticsTable = {'rsid':'VARCHAR(20)  PRIMARY KEY UNIQUE', 'chromosome':'VARCHAR(2)',
        'position':'VARCHAR(9)', 'genotype':'VARCHAR(2)'}
        db.createTable(table_name, geneticsTable)
}
const new_variants_table = () => {
    const variantsTable = {'rsid':'VARCHAR(20) PRIMARY KEY UNIQUE', 'gene':'VARCHAR(20)', 'variant':'VARCHAR(20)'}
    db.createTable('gene_variant', variantsTable)
}
const new_panels_table = () => {
    const panelsTable = {'panel_id':'int(11) PRIMARY KEY UNIQUE', 'panel_name':'VARCHAR(50) NOT NULL'}
    db.createTable('panels', panelsTable)
}
const new_panelrs_table = () => {
    const panelrsTable = {'panel_id':'int(11) NOT NULL', 'rsid':'VARCHAR(20) NOT NULL'}
    db.createTable('panel_rs', panelrsTable)
}

const drop_existing_table = (table_name) => {
    db.dropTable(table_name)
}

const clean_table = (table_name) => {
    db.deleteTable(table_name)
}

const create_and_populate_from_raw = (file_path, table_name) => {
    new_genetics_table(table_name)
    csv(file_path, (data) => {
        // For all of data
        db.insertDataBulk(table_name, data)
    })
}

module.exports = {new_genetics_table, new_variants_table, new_panels_table, new_panelrs_table,
    drop_existing_table, clean_table, create_and_populate_from_raw}