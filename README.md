<h1>Blog and Note Saving and Listing Application</h1>
<p>This project is a full-stack web application developed using React, Express.js, MongoDB, Mongoose, Redux Toolkit, React Router DOM, React Bootstrap, Axios, Bcrypt, and JSON Web Token (JWT). It allows users to create and list blogs and notes. Users can log in to create notes and blogs, which are then associated with their accounts. In the user panel, users can see the notes and blogs they have created. Only the users who created the notes and blogs can delete them.
</p>
<br/>

<h2>Features</h2>

- User authentication: Users can sign up, log in, and log out securely using bcrypt for password hashing and jsonwebtoken for token-based authentication.
- CRUD operations: Users can create, read, update, and delete both notes and blog posts.
- User-specific data: Notes and blog posts are associated with the user who created them, ensuring that users can only manage their own content.
- Responsive design: The application is designed to be responsive and accessible across different devices and screen sizes, thanks to React Bootstrap.
- Protected routes: Certain routes are protected and can only be accessed by authenticated users.

<br/>
<br/>


<h2>Technologies Used</h2>

<ul>
<li>React</li>
<li>Express.js</li>
<li>MongoDB</li>
<li>Mongoose</li>
<li>Redux Toolkit</li>
<li>React Router DOM</li>
<li>React Bootstrap</li>
<li>Axios</li>
<li>Bcrypt</li>
<li>JSON Web Token (JWT)</li>
</ul>
<br/>

<h2>Installation</h2>

To run this application locally, follow these steps:

Clone the repository:

1- git clone https://github.com/talhaagull/full-stack-open-mern.git

2- cd project

Install dependencies for both the client and server:

3- cd client && npm install

4- cd ../server && npm install

<h3>Set up environment variables:</h3>

Create a .env file in the backend root directory with the following variables:

PORT=3001<br/>
MONGODB_URI=your_mongodb_connection_string<br/>
JWT_SECRET=your_jwt_secret

Start the server:

5- cd ../server && npm start

Start the client:

6- cd ../client && npm start

Access the application in your browser at http://localhost:3001.
<br/>
<br/>


<h2>Usage</h2>

Register a new user or log in with an existing account.

Create new notes and blogs from the user panel.

View and manage your notes and blogs.

Log out when you're done.

