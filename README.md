# SocialNetwork-NoSQL

## Visual Presentation :

The below link is a demonstration of how the API works using Insomnia.

View a complete Video demonstrarion of the application: [SocialNetwork-API]()

## Table of Contents

- [Description](#description)
- [User Story](#userStory)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies](#technologies)
- [Usage](#usage)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Description:

This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, the Mongoose ODM, and Moment.js to format timestamps. The seed data is created using Insomnia.

## User Story:

`AS A social media startup I WANT an API for my social network that uses a NoSQL database SO THAT my website can handle large amounts of unstructured data`

## Acceptance Criteria:

GIVEN a social network API

- WHEN I enter the command to invoke the application
  - THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
  - THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
  - THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
  - THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Technologies:

<p>
 <img src="https://img.shields.io/badge/-Express-red" />
<img src="https://img.shields.io/badge/-JavaScript-purple" />
<img src="https://img.shields.io/badge/-Node-green" />
<img src="https://img.shields.io/badge/-MongoDB-grey" />
 <img src="https://img.shields.io/badge/-Mongoose-critical" />
 <img src="https://img.shields.io/badge/-Insomnia-informational" />
 <img src="https://img.shields.io/badge/-Moment.js-blueviolet" />

 </p>

## Usage:

Open Terminal

1. Start the server

```
    $ npm start
```

2. Open Insomnia Core to test API routes

## Installation:

This repo is not to be deployed, if you wanted to, you could by doing the following:

1. Download the repo files from the link below
2. You must have mongoDB installed
3. Run the following at the command line

```
    - npm init -y
    - npm install express
    - npm install mongoose
    - npm install moment
```

## Tests

Insomnia is used to test REST API calls.
On Insomnia, the following API routes have been created and used to add, update, or remove users, friends, thoughts, and reactions in the user's database.

📁 **USER**

- Create a new user: `POST /api/user`
- Get all users: `GET /api/user`
- Get a single user by its `id`: `GET /api/user/:userId`

- Update a user by its `id`: `PUT /api/user/:userId`

- Delete a user by its `id`: `DELETE /api/user/:userId`

📁 **FRIEND**

- Add a new friend to a user's friend list: `POST /api/user/:userid/friends/:friendId`
- Delete a friend from a user's friend list: `DELETE /api/user/:userid/friends/:friendId`

📁 **THOUGHT**

- Create a new thought: `POST /api/thoughts/`
- Get all thoughts: `GET /api/thoughts/`
- Get a single thought by its `id`: `GET /api/thoughts/:thoughtId`
- Update a thought by its `id`: `PUT /api/thoughts/:thoughtId`
- Delete a thought by its `id`: `DELETE /api/thoughts/:thoughtId`

📁 **REACTION**

- Create a reaction: `POST /api/thoughts/:thoughtId/reactions`
- Delete a reaction by the `reactionId`: `DEL /api/thoughts/:thoughtId/reactions/:reactionId`

## License:

This repository is licensed under the [MIT license](./LICENSE).

## Questions:

Please contact me at

- GitHub : [nkamth](https://github.com/nkamth)
- Email : [namitha.289@gmail.com](mailto:namitha.289@gmail.com)
