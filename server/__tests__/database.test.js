/*
 * Test Database module
 * 2022-01-20
 */

const { fail } = require('assert');
const fs = require('fs');

const config = require('../config.js');
const {TestsDataBase} = require('../database.js');


function testValues() {
  return Object.assign({}, 
    {"1642692001829":{"id":"f94ce400-87a3-439c-a816-f91004978819","tid":1642692001829,"submittedDate":"2022-01-20T16:05:20.581Z","uid":-1,"testName":"2","testDate":"2022-01-17","testNumQs":10,"testScore":"50","testAvgScore":"59","testTime":"14.56"},"1642694728401":{"id":"8e7e3d56-5995-4bd1-aa11-3e3f658dacb5","tid":1642694728401,"submittedDate":"2022-01-20T16:07:00.137Z","uid":-1,"testName":"3","testDate":"2022-01-17","testNumQs":"20","testScore":"70","testAvgScore":"65","testTime":"28"},"1642694828062":{"id":"f4368f78-2fc0-438d-8676-1899106cc2ef","tid":1642694828062,"submittedDate":"2022-01-20T16:10:24.374Z","uid":-1,"testName":"4","testDate":"2022-01-18","testNumQs":"20","testScore":"65","testAvgScore":"65","testTime":"27.5"},"1642696086196":{"id":"3e7f26f3-748f-471a-ae07-93bb1b44cd80","tid":1642696086196,"submittedDate":"2022-01-20T16:41:27.413Z","uid":-1,"testName":"1","testDate":"2022-01-16","testNumQs":"30","testScore":"55","testAvgScore":"63","testTime":"45"}});
}



describe("Tests Database", () => {
  afterAll( () => {
    fs.unlink(config.db.path, (err) => {
      if (err) {console.error(err);}
    });
  });

  describe( "Read", () => {

    it( "Read empty", () => {
      fs.writeFileSync(config.db.path, JSON.stringify({}), (err) => {
        if (err) { fail('Got error: ' + err); }});

        let db = new TestsDataBase(config.db.path);

        return db.getTests().then(
          (resolve) => { expect(resolve).toStrictEqual({}); },
          (err) => { fail('Got error: ' + err); })
    });
    
    it( "Read 2 tests", () => {
      fs.writeFileSync(config.db.path, JSON.stringify(testValues()), (err) => {
        if (err) { fail('Got error: ' + err); }});

        let db = new TestsDataBase(config.db.path);

        return db.getTests().then(
          (resolve) => {
            expect(resolve).toStrictEqual(testValues())},
          (err)  => { fail('Got error: ' + err); })
    });

    it( "Read with tid", () => {
      fs.writeFileSync(config.db.path, JSON.stringify(testValues()), (err) => {
        if (err) { fail('Got error: ' + error) }});

        let db = new TestsDataBase(config.db.path);

        return db.getTest("1642692001829").then(
          (resolve) => {
            expect(resolve).toStrictEqual(testValues()["1642692001829"])},
          (err)  => { fail('Got error: ' + err); })
    });
    
  });


  describe( "Save", () => {
    let db = null;
    let testValueSave = {"id":"e9526a64-2f3f-49fa-ba0e-375f8ae6d121","tid":1642697006706,"submittedDate":"2022-01-20T16:44:18.879Z","uid":-1,"testName":"5","testDate":"2022-01-18","testNumQs":"40","testScore":"67.5","testAvgScore":"63","testTime":"55"};
    let testValueUpdate = {"id":"e9526a64-2f3f-49fa-ba0e-375f8ae6d121","tid":1642697006706,"submittedDate":"2022-01-20T20:16:56.577Z","uid":-1,"testName":"5","testDate":"2022-01-19","testNumQs":"30","testScore":"60","testAvgScore":"61","testTime":"40"};

    beforeEach(() => {
      fs.writeFileSync(config.db.path, JSON.stringify(Object.assign({}, testValues())), (err) => {
        if (err) { console.error(err); }});
      
      db = new TestsDataBase(config.db.path);
    });

    it( "Create new test", () => {
      return db.getTests()
        .then(originalDB => {
          originalDB[testValueSave["tid"]] = testValueSave;

          return db.saveTest(testValueSave)
            .then(save => db.getTests())
            .then(newDB => { expect(newDB).toStrictEqual(originalDB); })})
        .catch(err => fail('Got error: ' + err))
    });
    
    it( "Update test", () => {
      return db.getTests()
        .then(originalDB => {
          originalDB[testValueUpdate["tid"]] = testValueUpdate;

          return db.saveTest(testValueSave)
            .then(save => db.saveTest(testValueUpdate))
            .then(save => db.getTests())
            .then(newDB => { expect(newDB).toStrictEqual(originalDB); })})
        .catch(err => fail('Got error: ' + err))
    });
  });

  describe( "Delete", () => {
    let db = null;
    let testValueDelete = {"id":"e9526a64-2f3f-49fa-ba0e-375f8ae6d121","tid":1642697006706,"submittedDate":"2022-01-20T16:44:18.879Z","uid":-1,"testName":"5","testDate":"2022-01-18","testNumQs":"40","testScore":"67.5","testAvgScore":"63","testTime":"55"};

    beforeEach(() => {
      let tests = Object.assign({}, testValues());
      tests[testValueDelete["tid"]] = testValueDelete;

      fs.writeFileSync(config.db.path, JSON.stringify(tests), (err) => {
        if (err) { console.error(err); }});
      
      db = new TestsDataBase(config.db.path);
    });

    
    it( "Delete test: check DB", () => {
      return db.deleteTest(testValueDelete["tid"])
                .then(del => db.getTests())
                .then(tests => expect(tests).toStrictEqual(testValues()))
                .catch(err =>  fail('Got error: ' + err));
    });

    it( "Delete test: check return", () => {
      return db.deleteTest(testValueDelete["tid"])
               .then(del => expect(del).toStrictEqual(testValueDelete))
               .catch(err => fail('Got error: ' + err));
    });
  });
})
