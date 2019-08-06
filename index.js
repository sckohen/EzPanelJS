const csv = require('./parse_csv')
const panel = require('./extractPanel')
const database = require('./init_table')

database.create_and_populate_from_raw('raw.csv', 'aek25')

/*panel.extractPanel("Emotional_Fitness_Panel", 'aek23', (response) => {
    console.log(response)
})*/

