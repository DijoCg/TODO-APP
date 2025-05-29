# TODO-APP
To-Do App – Documentation
This is a full-stack To-Do App with a Node.js + Express backend and a React.js frontend. The backend handles user authentication and task management, with all data stored in MongoDB Atlas.


Backend - 
Users can sign up, log in, and manage tasks (add, edit, delete, mark complete/incomplete). Auth is handled with JWT, and passwords are encrypted with bcryptjs. Data is stored in MongoDB Atlas.

Frontend -

Built with React.js and styled using Tailwind CSS, the frontend provides a clean UI. Users can view and manage tasks, filter by status (all, completed, pending), search tasks, and see progress (% completed). Axios is used for API calls, and JWT tokens are stored in localStorage for secure access.


User Auth Features - 

Sign Up – Create a new user account with email and password

Sign In – Log in and get a token (JWT)

Auth is required to manage tasks

Passwords are encrypted (secure)

Task Features -

Add a new task

Edit an existing task

Delete a task

Mark task as complete/incomplete

Filter tasks (All / Completed / Pending)

Search tasks by text

Show percentage of completed tasks



Tech Used:

Frontend (Client) -

React.js 

Tailwind CSS 

Axios – For making HTTP requests to the backend


Backend (Server) - 

Node.js 

Express.js

MongoDB Atlas

Mongoose

bcryptjs

jsonwebtoken (JWT)

dotenv

nodemon 

cors

total-time taken = 1 days

Challenges Faced -

While working on this project, I faced significant challenges due to heavy rain causing frequent power interruptions. Since I was using a desktop PC without a reliable backup power source, these outages disrupted my workflow and caused delays. Managing work with an unstable power supply was the main difficulty I encountered throughout the development process.