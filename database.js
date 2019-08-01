var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

const createTable = (table_name, obj) => {
    let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
            // Cannot open database
            console.error("Cannot open database to create table.", err.message)
            throw err
        }else {
            console.log('Connected to the SQLite database.')
        }
    })

    // Fields of the table.
    let fields = ""
    // Column name of the table.
    let keys = Object.keys(obj)

    keys.map(key => {
        fields += key.trim() + " " + obj[key].trim() + ","
    })

    fields = fields.slice(0, -1)

    const createStatement = `CREATE TABLE IF NOT EXISTS ${table_name} (
        ${fields})`

    db.run(createStatement, (err) => {
        if (err) {
            // Table already created
            console.log(`The table: ${table_name} already exists.`)
        } else {
            // Table just created
            console.log(`The table ${table_name} successfully created.`)
        }
    })
    // db.close()
}

const insertData = (table_name, data) => {
    let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
            // Cannot open database
            console.error("Cannot open database to insert rows.", err.message)
            throw err
        }else {
            console.log('Connected to the SQLite database.')
        }
    })

    // Values of the table.
    let values = ""
    let columnNames = ""
    // Column name of the table.
    let keys = Object.keys(data)
    // Gets values of the table from the object.
    keys.map(key => {
        columnNames += "'" + key.trim() + "',"
        values += "'" + data[key].trim() + "',"
    })

    values = values.slice(0, -1)
    columnNames = columnNames.slice(0, -1)

    let insertStatement = `INSERT INTO ${table_name} (${columnNames}) VALUES (${values})`

    db.run(insertStatement, [], err => {
        console.log(`Row already exists within ${table_name}`)
    })
    db.close()
}

const insertDataBulk = (table_name, datas) => {
    let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
            // Cannot open database
            console.error("Cannot open database to insert bulk.", err.message)
            throw err
        }else {
            console.log('Connected to the SQLite database.')
        }
    })

    datas.map((data) => {
        // Values of the table.
        let values = ""
        let columnNames = ""
        // Column name of the table.
        let keys = Object.keys(data)
        // Gets values of the table from the object.
        keys.map(key => {
            columnNames += "'" + key.trim() + "',"
            values += "'" + data[key].trim() + "',"
        })

        values = values.slice(0, -1)
        columnNames = columnNames.slice(0, -1)

        let insertStatement = `INSERT INTO ${table_name} (${columnNames}) VALUES (${values})`

        db.run(insertStatement, [], err => {
          if (err) console.log(`Row already exists within ${table_name}`)
        })
    })

   // db.close()
}

module.exports = {createTable, insertData, insertDataBulk}