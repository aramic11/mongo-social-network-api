# mongo-social-network-api
This is a Node.js/Express.js backend for a social media application that allows users to have friends, create and manage thoughts and reactions to those thoughts. I used MongoDB as the database to store the information which can be viewed, updated and deleted with Insomnia.


## Installation
Once the project is forked, type in npm i and npm start in the terminal so you could view the program in Insomnia

## Usage
The API endpoints are as follows:

Thoughts
GET /api/thoughts: Get all thoughts
GET /api/thoughts/:thoughtId: Get a single thought by its ID
POST /api/thoughts: Create a new thought
PUT /api/thoughts/:thoughtId: Update a thought by its ID
DELETE /api/thoughts/:thoughtId: Delete a thought by its ID
POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought

Users
GET /api/users: Get all users
GET /api/users/:userId: Get a single user by their ID
POST /api/users: Create a new user
PUT /api/users/:userId: Update a user by their ID
DELETE /api/users/:userId: Delete a user by their ID

## License
This project is licensed under the MIT license.