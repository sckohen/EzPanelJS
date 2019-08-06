let mysql = require('mysql')

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : '123456789first',
    database : 'gene_bank'
});

const extractPanel = (panel_name, table_name, callback) => {
    connection.connect([], err => {
        if (err) {
            console.log(err)
        }
    })

    let query = "SELECT g.gene, g.variant, a.* " +
        "FROM " + table_name + " AS a " +
        "LEFT JOIN gene_variant AS g ON a.rsid = g.rsid " +
        "LEFT JOIN panelrs AS pr ON a.rsid = pr.rsid " +
        "LEFT JOIN panels AS p ON pr.panel_id = p.panel_id " +
        "WHERE p.panel_name = '" + panel_name + "';"

    connection.query(query, [], (error, results, fields) => {
        if (error) return console.log(error)
        callback(results)
    })
    connection.end()
}

module.exports = {extractPanel}