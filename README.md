## **Social Media Backend**

### **Project Overview**

The Social Media Backend project is designed to provide a robust backend infrastructure for a social media platform. It includes user management, discussion posting, interaction features, and search functionalities based on tags and text. This project aims to facilitate seamless user interactions, content sharing, and discovery within a social network environment.

### **Features**
#### User Management:
- Create, update, delete users
- Login functionality with JWT authentication
- Search users by name

#### Discussion Management:
- Create, update, delete discussions
- View discussions with view counts
- Search discussions by tags and text

#### Comment Management:
- Create, update, delete comments
- Reply to comments
- Like/unlike comments and discussions

#### Additional Features:
- JWT-based authentication middleware
- Error handling middleware
- Express.js for routing
- MongoDB for data storage

### APIs

#### Users:

- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users` - Get a list of all users
- `GET /api/users/search?name={searchQuery}` - Search users by name
- `POST /api/login` - Login user with credentials
- `PUT /api/follow/:id` - Follow another user
- `PUT /api/unfollow/:id` - Unfollow another user

#### Discussions:

- `POST /api/discussions` - Create a new discussion
- `PUT /api/discussions/:id` - Update a discussion
- `DELETE /api/discussions/:id` - Delete a discussion
- `GET /api/discussions` - Get a list of all discussions
- `GET /api/discussions/tags?tag={tag}` - Get discussions by tag
- `GET /api/discussions/search?text={searchQuery}` - Search discussions by text
- `PUT /api/like/:id` - Like a discussion
- `PUT /api/unlike/:id` - Unlike a discussion
- `GET /api/:id/view` - View a discussion with view count

#### Comments:

- `POST /api/comments` - Create a new comment
- `PUT /api/comments/:id` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment
- `GET /api/comments/:discussionId` - Get comments for a specific discussion
- `PUT /api/comment/like/:id` - Like a comment
- `PUT /api/comment/unlike/:id` - Unlike a comment
- `POST /api/reply` - Reply to a comment

### Installation

#### Clone the repository:

```bash
git clone https://github.com/your/repository.git
cd repository
```

### Install dependencies:

```bash
npm install
```
### Set up environment variables:
Create a .env file based on .env.example and fill in your MongoDB connection URI and JWT secret.

### Start the server:
```bash
npm start
```

### Technologies Used
- Node.js: JavaScript runtime for server-side application.
- Express.js: Web framework for Node.js, simplifying routing and middleware logic.
- MongoDB: NoSQL database for storing application data.
- JWT: JSON Web Tokens used for authentication and securing API endpoints.


