#### Agenda

Backend application in Node.js using the MongoDB native driver to create RESTful APIs with authentication, transactions, and implement asynchronous error handling using promises. You are required to use the provided database schema as reference.

Database Schema:
https://dbdiagram.io/d/64a1c7e102bd1c4a5e5fc28c

Requirements:

- [ ] Implement admin, user and dealership authentication using JWT(Json Web Token ).

- [ ] Implement a mechanism to invalidate JWT to facilitate logout and password change.

- [ ] Create REST endpoints for user :

  - [ ] To view all cars
  - [ ] To view all cars in a dealership
  - [ ] To view dealerships with a certain car
  - [ ] To view all vehicles owned by user
  - [ ] To view the dealerships within a certain range based on user location(use maps api)
  - [ ] To view all deals on a certain car
  - [ ] To view all deals from a certain dealership
  - [ ] To allow user to buy a car after a deal is made

- [ ] Create REST endpoints for dealership :

  - [ ] To view all cars.
  - [ ] To view all cars sold by dealership
  - [ ] To add cars to dealership
  - [ ] To view deals provided by dealership
  - [ ] To add deals to dealership
  - [ ] To view all vehicles dealership has sold
  - [ ] To add new vehicle to the list of sold vehicles after a deal is made

- [ ] Post requests should be able to handle multipart/form-data

- [ ] Implement asynchronous error handling using promises for all API endpoints. Handle and respond to any errors gracefully.

- [ ] Use ES6 compatible code i.e. use ES modules for import rather than common js import, use promises instead of callbacks etc.

- [ ] Use faker js to create dummy data.

- [ ] Provide basic api documentation for your code.

- [ ] You are not allowed to use the Mongoose library for this assignment.

NOTE
It is not expected from you to implement all the functionalities mentioned above, your willingness and ability to learn is a more significant factor in evaluating your performance. However, a complete and comprehensive project will be highly regarded during the assessment process.
