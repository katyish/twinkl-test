# User Signup API

- [Endpoint Documentation](#endpoints)
- [Development Environment Setup](#setup)
- [Future Improvements](#future-changes-for-a-more-realistic-app)

## The Application

This is a REST API, built using TypeScript and Express. Users are stored in an in-memory array - data only persists while the application is running.

The original readme and requirements for this task can be found here: [Instructions](instructions.md)

- User ID is in the form of a randomly generated UUID (so we don't have to keep track/increment)
- Passwords are hashed before saving, and password is not included in the response (pull request #1 and #2)
- Added validation to the `name` field to check it's between 2 and 100 characters, rather than just not empty
- Added a Dockerfile and docker-compose to build the app in a container
- Added a very simple Github workflow to lint, build and run tests on PR/merge to main

# Endpoints

There are two API endpoints:

### Fetch User Information

`/user/:id` GET endpoint to return information for a given user id.
Returns `200` and a JSON object describing the user, or `404` if no user exists for that id.

```bash
curl -X GET http://localhost:3000/user/a8429ab6-b732-4cb9-bfb0-65e4db324394
```

### Create User

`/user` POST endpoint to validate and save a new user.
Returns `201` and a JSON object describing the user, or `400` with a detailed error response if validation fails

To call from the command line:

```bash
curl -X POST http://localhost:3000/user \
   -H 'Content-Type: application/json' \
   -d '{"name":"Sally Evans","password":"Pa55W0rd", "email": "sally@evans.org.uk", "userType": "student"}'
```

## Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.

### Installation

Ensure you are using version `20.11.0` of Node. Install dependencies:

```
npm i
```

### Usage

In development the following command will start the server and use `nodemon` to auto-reload the server based on file changes

```
npm run dev
```

The server will start at `http://localhost:3000` by default. You can change the port in `src/index.ts`

Testing is done using Jest and Supertest, and can be run with:

```
npm run test
```

There are also commands to build and start a server without nodemon:

```
npm run build
npm start
```

And to build and run using a Docker container:

```
docker compose up
```

## Future changes for a more realistic app

With more time I'd have ticked off a few of these, but there's a balance between "meeting the requirements in a sensible timefram" and "going down a rabbit hole chasing perfection"

### General improvements:

- [ ] Use a proper logging library instead of `console.log()`, and generally improve what gets logged
- [ ] I chose to put Zod validation in the service, but it could be setup as middleware
- [ ] There's a user object hardcoded into `UserList` in the service class, which is used by the tests and the examples in this readme. This could (should) be mocked for testing purposes.
- [ ] Upgrade Node. v20 is _very_ old now. If the instructions/setup hadn't specified a version, I'd have built this on v24 (or maybe 26, as that's very nearly LTS).
- [ ] General git repository setup - protect main branch, require CI to pass, etc etc. Out of scope for this task.

### Additional functionality:

- [ ] Check if a user (email address) already exists before creating. Return 409 Conflict
- [ ] Better API documentation - Swagger or similar
- [ ] More validation/sanitation of user input. For security reasons, but also pragmatic things like "capitalisation of email shouldn't matter when trying to log in"
- [ ] Route for login - validate email/password
- [ ] Route to update user (add `updatedAt` field)
- [ ] Route to remove user (if soft delete - add `deletedAt` or `disabled` field)
- [ ] Use a proper datastore so that data is persisted.
