This web application was developed as part of the Web Technologies module at WIUT. It allows users to manage book reviews with full CRUD functionality: Create, Read, Update, and Delete reviews (including title, author, genre, and review text).

Features: all users can view reviews. Only logged-in users can add, edit, or delete their own reviews.
Review input is validated (e.g., text must be between 10–500 characters).
RESTful routes and proper error handling.Simple, responsive UI with basic CSS styling.
Technologies Used : Backend: Node.js, Express.js
Frontend: Pug templating engine, CSS
Database: MongoDB Atlas (via Mongoose)
Authentication: Passport.js with bcrypt
Validation: express-validator
Learning Outcomes Addressed
This project fulfills Learning Outcomes 4–7, demonstrating:
Server-side development with Express.js
Use of NoSQL database with Mongoose
Secure user authentication and session handling
Input validation and error handling
How to Run Locally

**Clone the repository:**
git clone https://github.com/Ibragimov090/WT_CW_2_17875.git
cd book-review-app

Install dependencies:
npm install

Start the server:
npm start


Visit the app at:
http://localhost:3000
Note: Ensure your MongoDB Atlas URI is correctly set in app.js and your IP is whitelisted in Atlas.

Usage
View all reviews: /reviews
Login: /auth/login
Register: /auth/register
Add/Edit/Delete your own reviews after logging in

Project Structure:
/book-review-app
app.js                  # App setup (Express, Mongoose, Passport)
package.json            # Dependencies and metadata
.gitignore              # Ignore node_modules and other files
/public
    /styles/style.css   # Basic CSS
/routes
    index.js            # Home route
    reviews.js          # CRUD routes for reviews
    auth.js             # Auth routes (login/register)
/controllers
    reviews.js          # Route handlers and validation logic
/services
    reviews.js          # Mongoose-based CRUD operations
/models
    review.js           # Review schema
    user.js             # User schema
/views
    layout.pug          # Base layout with navigation
    index.pug           # Review listing
    new.pug             # Add new review form
    edit.pug            # Edit review form
    login.pug           # Login page
    register.pug        # Registration page

Dependencies:
express              ^4.17.1
pug                  ^3.0.3
method-override      ^3.0.0
mongoose             ^8.13.2
express-validator    ^7.2.1
passport             ^0.7.0
passport-local       ^1.0.0
bcrypt               ^5.1.1
express-session      ^1.18.0

Dev dependency:
nodemon              ^3.1.9

**To install everything:**
npm install express pug method-override mongoose express-validator passport passport-local bcrypt express-session

**Links**
GitHub: https://github.com/Ibragimov090/WT_CW_2_17875.git
Live App: https://book-review-app-17875.onrender.com