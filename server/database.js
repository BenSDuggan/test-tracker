/*
 * Interact with the database
 * 2022-01-20
 */

const fs = require('fs');
const config = require('./config.js');

class TestsDataBase {
    constructor() {
        this.databasePath = config.db.path;
    }

    // Getters
    getTests() {
        /*
         * Get all the tests
         * 
         * Returns: A promise with the JSON object with tests
         */

        return new Promise((resolve, reject) => {
            fs.readFile(this.databasePath, (err, data) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }

                if(data.length > 0) { resolve(JSON.parse(data)); }
                else { resolve({}); }
            })
        })
    }

    getTest(tid) {
        /*
         * Get a specific test marked by the `tid`
         * 
         * Returns: JSON object with tests
         */
    
        return new Promise((resolve, reject) => {
            this.getTests().then(
                (resolve2) => { resolve(resolve2[tid]); },
                (err) => { reject(err); }
            )
        })
    }

    // Setters
    saveTest(data) {
        /*
        * Create or update a test. `data` must contain `tid` the test ID.
        * 
        * Returns: a JSON object with the created status `{"created":true}` if the test was successfully saved and false otherwise
        */

        return this.getTests()
                    .then(tests => {
                        return new Promise((resolve, reject) => {
                            let created = true;
                            if(tests.hasOwnProperty(data.tid)) { created = false };
                            tests[data.tid] = data;
                    
                            fs.writeFile(this.databasePath, JSON.stringify(tests), (err) => {
                            
                                if (err) reject(err);
                    
                                resolve(created);
                            });
                        })
                    })
    }

    deleteTest(tid) {
        /*
        * Delete a specific test marked by the `tid`
        * 
        * Returns: A promise with the test that was deleted.
        */

        return this.getTests()
                   .then(tests => {
                        let test = tests[tid];
                        delete tests[tid];

                        return new Promise((resolve, reject) => {
                        fs.writeFile(this.databasePath, JSON.stringify(tests), (err) => {
                        
                            if (err) reject(err)
                
                            resolve(test);
                        });
                   })
        })
    }
}



module.exports.TestsDataBase = TestsDataBase;

