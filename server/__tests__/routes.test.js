/*
 * Test routes module
 * 2022-01-21
 */

const { fail } = require('assert');
const fs = require('fs');
const request = require('supertest');

const config = require('../config.js');
const {TestsDataBase} = require('../database.js');
const {app, server} = require("../routes");


function testValues() {
  return Object.assign({}, 
    {"1642692001829":{"id":"f94ce400-87a3-439c-a816-f91004978819","tid":1642692001829,"submittedDate":"2022-01-20T16:05:20.581Z","uid":-1,"testName":"2","testDate":"2022-01-17","testNumQs":10,"testScore":"50","testAvgScore":"59","testTime":"14.56"},"1642694728401":{"id":"8e7e3d56-5995-4bd1-aa11-3e3f658dacb5","tid":1642694728401,"submittedDate":"2022-01-20T16:07:00.137Z","uid":-1,"testName":"3","testDate":"2022-01-17","testNumQs":"20","testScore":"70","testAvgScore":"65","testTime":"28"},"1642694828062":{"id":"f4368f78-2fc0-438d-8676-1899106cc2ef","tid":1642694828062,"submittedDate":"2022-01-20T16:10:24.374Z","uid":-1,"testName":"4","testDate":"2022-01-18","testNumQs":"20","testScore":"65","testAvgScore":"65","testTime":"27.5"},"1642696086196":{"id":"3e7f26f3-748f-471a-ae07-93bb1b44cd80","tid":1642696086196,"submittedDate":"2022-01-20T16:41:27.413Z","uid":-1,"testName":"1","testDate":"2022-01-16","testNumQs":"30","testScore":"55","testAvgScore":"63","testTime":"45"}});
}



describe("Tests routes", () => {

  afterAll( () => {
    fs.unlinkSync(config.db.path);
    server.close();
  });

  describe( "Get", () => {
    it( "Get: Version", async () => {
        const response = await request(app).get("/api/v1/version");
        expect(response.body).toEqual({version:config.version});
        expect(response.statusCode).toBe(200);
    });

    it( "Get: Read empty", async () => {
        fs.writeFileSync(config.db.path, JSON.stringify({}), (err) => {
          if (err) { fail('Got error: ' + err); }});
  
        const response = await request(app).get("/api/v1/tests");
        expect(response.body).toEqual({});
        expect(response.statusCode).toBe(200);
      });
    
    it( "Get: Read many tests", async () => {
      fs.writeFileSync(config.db.path, JSON.stringify(testValues()), (err) => {
        if (err) { fail('Got error: ' + err); }});

        const response = await request(app).get("/api/v1/tests");
        expect(response.body).toEqual(testValues());
        expect(response.statusCode).toBe(200);
    });

    it("Read with tid", async () => {
      fs.writeFileSync(config.db.path, JSON.stringify(testValues()), (err) => {
        if (err) { fail('Got error: ' + error) }});

        const response = await request(app).get("/api/v1/tests/1642692001829");
        expect(response.body).toEqual(testValues()["1642692001829"]);
        expect(response.statusCode).toBe(200);
    });
    
  });
})
