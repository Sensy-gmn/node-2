## Project Structure

The project is organized into the following main directories:

- `controllers/`: Contains the logic for handling requests and responses
- `models/`: Defines the data models using Mongoose schemas
- `routes/`: Defines the API routes and links them to the appropriate controllers

## API Endpoints

### Users

- `GET /users`: Get all users
- `GET /users/:id`: Get a user by ID
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a user
- `DELETE /users/:id`: Delete a user

### Posts

- `GET /posts`: Get all posts
- `GET /posts/:id`: Get a post by ID
- `GET /posts/specificUser/:id`: Get posts by user ID
- `POST /posts`: Create a new post
- `PUT /posts/:id`: Update a post
- `DELETE /posts/:id`: Delete a post

### Comments

- `GET /comments`: Get all comments
- `GET /comments/:id`: Get a comment by ID
- `GET /comments/user/:id`: Get comments by user ID
- `GET /comments/forPost/:id`: Get comments for a specific post
- `POST /comments`: Create a new comment
- `PUT /comments/:id`: Update a comment
- `DELETE /comments/:id`: Delete a comment

## Models

### User

```
const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    age: { type: Number, required: true },
})
```

### Post 

```
const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
```

### Comment

```
const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});
```
