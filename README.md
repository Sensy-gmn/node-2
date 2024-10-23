# Blog API

## Posts

### Get All Posts
GET /posts
Retrieves all posts from the database.

### Get Post by ID
GET /posts/:id
Retrieves a specific post by its ID.

### Get Posts by User ID
GET /posts/specificUser/:id
Retrieves all posts created by a specific user.

### Create Post
POST /posts
Creates a new post.
Body:
{
  "title": "string",
  "body": "string",
  "userId": "string"
}

### Update Post
PUT /posts/:id
Updates an existing post.
Body:
{
  "title": "string",
  "body": "string",
  "userId": "string"
}

### Delete Post
DELETE /posts/:id
Deletes a specific post by its ID.

## Comments

### Get All Comments
GET /comments
Retrieves all comments from the database.

### Get Comment by ID
GET /comments/:id
Retrieves a specific comment by its ID.

### Get Comments by User ID
GET /comments/user/:id
Retrieves all comments made by a specific user.

### Get Comments by Post ID
GET /comments/forPost/:id
Retrieves all comments for a specific post.

### Create Comment
POST /comments
Creates a new comment.
Body:
{
  "author": "string",
  "content": "string",
  "postId": "string"
}

### Update Comment
PUT /comments/:id
Updates an existing comment.
Body:
{
  "author": "string",
  "content": "string"
}

### Delete Comment
DELETE /comments/:id
Deletes a specific comment by its ID.

## Users

### Get All Users
GET /users
Retrieves all users from the database.

### Get User by ID
GET /users/:id
Retrieves a specific user by their ID.

### Create User
POST /users
Creates a new user.
Body:
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string",
  "age": number
}

### Update User
PUT /users/:id
Updates an existing user.
Body:
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string",
  "age": number
}

### Delete User
DELETE /users/:id
Deletes a specific user by their ID.

## Models

### Post Model
