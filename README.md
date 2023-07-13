#Social Network API

This project is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and manage their friend list. The API is built using Express.js for routing, MongoDB as the database, and Mongoose as the ODM. It provides endpoints for various functionalities such as user management, thought sharing, reactions, and friend operations.

##Technologies Used

Express.js: A minimal and flexible Node.js web application framework. MongoDB: A document-oriented NoSQL database for storing data. Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js. Moment.js Date library.

##Installation

1.Clone the repository and navigate to the project directory. 2.Install the dependencies running 'npm install' 3.Configure the MongoDB connection by providing the appropriate URL in the project's configuration files.

##Usage

1.Start the server running 'npm start' 2.Access the API endpoints through the appropriate routes

##API Endpoints

The following API endpoints are available:

###User Routes:

GET /api/users: Get all users.

GET /api/users/:userId: Get a single user by their userId and populate their thoughts and friends.

POST /api/users: Create a new user.

PUT /api/users/:userId: Update a user by their userId.

DELETE /api/users/:userId: Delete a user by their userId.

###Thought Routes:

GET /api/thoughts: Get all thoughts.

GET /api/thoughts/:thoughtId: Get a single thought by its thoughtId.

POST /api/thoughts: Create a new thought.

PUT /api/thoughts/:thoughtId: Update a thought by its thoughtId.

DELETE /api/thoughts/:thoughtId: Delete a thought by its thoughtId.

###Reaction Routes:

POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.

DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought.

###Friend Routes:

POST /api/users/:userId/friends/:friendId: Add a friend to a user.

DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user.

##Links to Video Walkthrough

(Part 1) https://drive.google.com/file/d/1_dNKhq1HwG6MgQbiUyJC1MgHwy_PGxnF/view?usp=sharing

(Part 2) https://drive.google.com/file/d/1CgvOyojeFB9yvTa0hvxyuWRs1XlbOqhO/view?usp=sharing
