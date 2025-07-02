# educationELLy

![NodeJS](https://img.shields.io/badge/Node.js-badge.svg?style=popout&logo=node.js&labelColor=2873b4&logoColor=fb9438&color=86c64e)
![MongoDB](https://img.shields.io/badge/MongoDB-badge.svg?style=popout&logo=mongodb&labelColor=2873b4&logoColor=fb9438&color=86c64e)

> **educationELLy** aims to engage regular classroom teachers in the English language learning process by providing them with quick access to relevant information about the ELL students in their classes. By making ELL student information accessible to mainstream teachers and ELL teachers alike, educationELLy keeps an ELL student's teachers updated on his or her English language proficiency and provides a centralized platform through which all teachers can participate in the feedback process. educationELLy bridges the gap between ELL teachers and regular teachers and facilitates the creation of a more integrated curriculum for English language learners. With educationELLy, all teachers become language teachers.

## Getting Started

### Prerequisites

*   Node.js (v10.11.0 or higher)
*   npm
*   MongoDB

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/maxjeffwell/full-stack-capstone-server.git
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

### Running the Server

To run the server in development mode with nodemon, use:

```sh
npm start
```

The server will be running on `http://localhost:8080`.

## Running Tests

To run the tests, use the following command:

```sh
npm run test2
```

## API Endpoints

*   `POST /signup`: Create a new user.
*   `POST /signin`: Sign in an existing user.
*   `GET /logout`: Log out the current user.
*   `GET /whoami`: Get the current user's information.
*   `GET /students`: Get a list of all students.
*   `GET /students/:id`: Get a single student by ID.
*   `POST /students`: Create a new student.
*   `PUT /students/:id`: Update a student by ID.
*   `DELETE /students/:id`: Delete a student by ID.

## Project Structure

```
.
├── controllers
│   └── authentication.js   # Handles user signup and signin logic.
├── models
│   ├── student.js          # Mongoose model for students.
│   └── user.js             # Mongoose model for users.
├── services
│   └── passport.js         # Passport.js configuration for authentication strategies.
├── test
│   ├── server.test.js      # Tests for basic server functionality.
│   └── user.test.js        # Tests for user-related endpoints.
├── .babelrc                # Babel configuration.
├── .eslintrc.js            # ESLint configuration.
├── .gitignore              # Git ignore file.
├── .prettierrc             # Prettier configuration.
├── index.js                # Main server entry point.
├── package.json            # Project dependencies and scripts.
└── router.js               # Express router configuration.
```

## Key Dependencies

### Production Dependencies

*   `bcryptjs`: For hashing passwords.
*   `body-parser`: For parsing request bodies.
*   `cors`: For enabling Cross-Origin Resource Sharing.
*   `dotenv`: For loading environment variables.
*   `express`: Web framework for Node.js.
*   `jsonwebtoken`: For creating and verifying JSON Web Tokens.
*   `mongoose`: For interacting with MongoDB.
*   `passport`: For authentication.
*   `passport-jwt`: Passport strategy for JWT authentication.
*   `passport-local`: Passport strategy for local authentication.

### Development Dependencies

*   `@babel/core`, `@babel/node`, `@babel/preset-env`: For transpiling modern JavaScript.
*   `chai`, `chai-http`: For testing.
*   `eslint`: For linting.
*   `mocha`: For running tests.
*   `morgan`: For logging HTTP requests.
*   `nodemon`: For automatically restarting the server during development.

## Meta

by Jeff Maxwell [maxjeffwell@gmail.com](mailto:maxjeffwell@gmail.com) | [https://github.com/maxjeffwell](https://github.com/maxjeffwell) | [https://www.jeffmaxwell.dev](https://www.jeffmaxwell.dev)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square&labelColor=fb9438)](https://www.gnu.org/licenses/gpl-3.0)
Distributed under the GNU GPLv3 License. See `LICENSE` for more information.