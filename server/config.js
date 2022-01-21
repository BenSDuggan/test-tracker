/*
 * Config
 * 2022-01-20
 */

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    version:"v0.1.1",
    port: 3001,
    db:{
        path:'../tests.json'
    }
};

const test = {
    version:"v0.1.1",
    port: 3001,
    db:{
        path:'../testDB.json'
    }
};
   
const config = {
    dev,
    test
};

module.exports = config[env];