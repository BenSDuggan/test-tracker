/*
 * Example of how to use the database
 * 2022-01-19
 */

const {sum, TestsDataBase} = require('./database.js');

const dbPath = "../testsDev.json"

let db = new TestsDataBase(dbPath)
console.log(db)

console.log("\nReads:")

// Has data

db = new TestsDataBase(dbPath)
db.getTests().then(
    (resolve) => console.log(resolve))
    .catch(
        (err) => console.err(err))


// Create test
/*
db.saveTest({tid:"abc", score:5})
    .then(save => db.getTests())
    .then(tests => console.log(tests))
    .catch(e => console.error(e))
*/