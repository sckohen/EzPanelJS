let mysql = require('mysql')

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : '123456789first',
    database : 'gene_bank'
});

const createTable = (table_name, obj) => {
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
}

const insertData = (table_name, data) => {
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
    })
}

const insertDataBulk = (table_name, datas) => {
    let values = ""
    let bulkValue = ""
    let insertStatement = "";
    const firstData = datas[0];
    let columnNames = ""

    let keys = Object.keys(firstData)

    // Gets values of the table from the object.
    keys.map(key => {
        columnNames += key.trim() + ","

    })
    columnNames = columnNames.slice(0, -1)

    insertStatement = "INSERT INTO " + table_name + "(" + columnNames + ") VALUES"

    datas.map((data, index) => {
        let _keys = Object.keys(data)
        _keys.map(key => {

            values += "'" + data[key].trim() + "',"
        })
        values = values.slice(0, -1)

        bulkValue += " (" + values + "), "
        values = "";

        if (index % 1000 === 0) {
            let query = insertStatement + bulkValue
            query = query.slice(0, -2)
            connection.query(query, [],(error, results, fields) => {
                if (error) return console.log(error)
            })
            // console.log(query)
            bulkValue = ""
        }
    })
    //console.log(insertStatement);
}

const dropTable = (table_name) => {
    const dropQuery = "DROP TABLE IF EXISTS " + table_name + ";"

    connection.query(dropQuery, [],(error, results, fields) => {
        if (error) return console.log(error)
    })
}

const deleteTable = (table_name) => {
    const deleteQuery = "DELETE FROM " + table_name + ";"

    connection.query(deleteQuery, [],(error, results, fields) => {
        if (error) return console.log(error)
    })
}

module.exports = {createTable, insertData, insertDataBulk, dropTable, deleteTable}