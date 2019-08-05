let mysql = require('mysql')
let fs = require('fs')

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : '123456789first',
    database : 'gene_bank'
});

const createTable = (table_name, obj) => {
    connection.connect([], err => {
        if (err) {console.log(err)}
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

    connection.query(createStatement, [],(error, results, fields) => {
        if (error) return console.log(error)
        }
    )

    /*db.run(createStatement, (err) => {
        if (err) {
            // Table already created
            console.log(`The table: ${table_name} already exists.`)
        } else {
            // Table just created
            console.log(`The table ${table_name} successfully created.`)
        }
    })*/
     connection.end()
}

const insertData = (table_name, data) => {
    connection.connect([], err => {
        if (err) {console.log(err)}
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

    let insertStatement = "INSERT INTO `" + table_name + "` " + `(${columnNames}) VALUES (${values})`

    connection.query(insertStatement, [],(error, results, fields) => {
            if (error) return console.log(error)
        }
    )
    connection.end()
}

const insertDataBulk = (table_name, datas) => {

    connection.connect([], err => {
        if (err) {console.log(err)}
    })

    let bulkValue

    datas.map((data, index) => {
        // Values of the table.
        let values = ""

        // Names of the columns
        let columnNames = ""

        let keys = Object.keys(data)

        // Gets values of the table from the object.
        keys.map(key => {
            columnNames += key.trim() + ","
            values += "'" + data[key].trim() + "',"
        })

        values = values.slice(0, -1)
        columnNames = columnNames.slice(0, -1)

        bulkValue += `(${values}),`
        console.log(bulkValue)

        let insertStatement = "INSERT INTO " + table_name + "(" + columnNames + ")" + "VALUES" + bulkValue

        fs.writeFile('dat.txt', bulkValue, (err) => {
            if (err) console.log(err)
        })

        if (index % 25 === 0) {
           /* connection.query(insertStatement, [],(error, results, fields) => {
                if (error) return console.log(error)
            })*/
            // console.log(bulkValue)
            // bulkValue = ""
        }

    })
    connection.end()
}

module.exports = {createTable, insertData, insertDataBulk}