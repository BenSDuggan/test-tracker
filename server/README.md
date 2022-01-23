# Test Tracker Server

## Database

Currently the database is a JSON file located on the computer. The [database](/server/database.js) module contains all of the code for interacting with the database. It will be changed in the future to work with an actual web based DB.


## Routes


| Method | Route              | Send | Response code | Response                                                                                                                                                                                                                                    | Error                                               |
|--------|--------------------|------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| GET    | /api/v1/version    | null | 200           | { version:"v0.1.0" }                                                                                                                                                                                                                        | None                                                |
| GET    | /api/v1/tests      | null | 200           |                                                                                                                                                                                                                                             |                                                     |
| GET    | /api/v1/tests/:tid | null | 200           | {"id":"f94ce400-87a3-439c-a816-f91004978819", "tid":1642692001829, "submittedDate":"2022-01-20T16:05:20.581Z", "uid":-1,"testName":"2", "testDate":"2022-01-17", "testNumQs":10, "testScore":"50", "testAvgScore":"59", "testTime":"14.56"} |                                                     |
| POST   | /api/v1/tests/:tid |      | 200 201       | {message:"Updated"} {message:"Created"}                                                                                                                                                                                                     | 400: if `tid` in message.body and  test don't match |
| DELETE | /api/v1/tests/:tid |      | 200           |                                                                                                                                                                                                                                             |                                                     |

* All routes will return `500` as a general error

## API

All API routes are located at `localhost:3001/api/v1/`





