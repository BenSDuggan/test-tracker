/*
 * Config
 * 2022-01-22
 */

let env = process.env.NODE_ENV; // 'dev' or 'test'
if(!env) {
    env = "dev";
}

const VERSION = "v0.1.3";

const dev = {
    version:VERSION,
    port: 3001,
    db:{
        path:'../tests.json'
    }
};

const test = {
    version:VERSION,
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