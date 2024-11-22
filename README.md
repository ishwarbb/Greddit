# Greddit

Greddit is a Social Media Platform built on MERN stack. Most of Greddit's structure (including the name) is inspired from Reddit.

Hop on this platform that allows you to create your own sub-greddits or community spaces, interact with other by sharing posts,commenting, liking/disliking, reporting, and Following.

## Instructions 

### Step 1 : Run the server

```
cd backend
npm install
nodemon start
cd ..
```

Make sure that you get "Successfully Connected to MongoDB" message before moving on to Step 2.

### Step 2 : Run the Client
```
cd frontend
npm install
npm run start
cd ..
```

You are good to go. Have fun!!

## Key Features
#### User Authentication
- Secure login/registration with password hashing
- Persistent login across sessions

#### User Profile Management
- Edit profile details
- Followers and Following system
- View and manage followers/following lists

#### Sub Greddiit (Subreddit-like) Functionality
- Create and manage Sub Greddiits
- Join/Leave Sub Greddiits
- View Sub Greddiit statistics
- Moderator controls for Sub Greddiits

#### Content Interaction
- Create text-based posts
- Upvote/Downvote posts
- Comment on posts
- Save posts
- Follow post creators

### Moderation Tools
- Report system for inappropriate content
- Banned keywords detection
- Block user functionality
- Automated report management

## Technologies Used
- MongoDB (Database)
- Express.js (Backend)
- React.js (Frontend)
- Node.js (Runtime)