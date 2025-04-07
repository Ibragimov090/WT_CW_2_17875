# Book Review App

A web application for managing book reviews with full CRUD functionality (create, read, update, delete). Built with Node.js, Express.js, Pug, and MongoDB Atlas (via Mongoose). Review text is validated (10–500 characters) using express-validator.

## Running Locally

1. **Clone the repo**:  
   `git clone https://github.com/Ibragimov090/WT_CW_2_17875.git`  
2. **Install dependencies**:  
   Requires Node.js v14+. Run:  
   `npm install`  
3. **Start the server**:  
   `npm start`  
4. **Access the app**:  
   Visit `http://localhost:3000`  

**Troubleshooting**:  
- Ensure your IP is whitelisted in MongoDB Atlas if connection fails.  
- Check the connection string in `app.js`.

## Dependencies

- `npm install express pug mongoose method-override express-validator`  
- Dev: `npm install --save-dev nodemon`

## Links

- **GitHub Repo**: [https://github.com/Ibragimov090/WT_CW_2_17875](https://github.com/Ibragimov090/WT_CW_2_17875)  
- **Live App**: [Insert live URL, e.g., https://book-review-app-17875.glitch.me]  

## Project Structure

`app.js`                     # Express setup, MongoDB connection, routes  
`package.json`               # Metadata and dependencies  
`public/styles/style.css`    # Basic CSS for forms and errors  
`routes/`                    # Route handlers  
   -`index.js`               # Homepage routes  
   -`reviews.js`             # CRUD routes for reviews  
`controllers/reviews.js`     # Request logic and validation  
`services/reviews.js`        # DB queries with Mongoose  
`models/review.js`           # Review schema (title, author, genre, review)  
`views/`                     # Pug templates  
   -`layout.pug`             # Base layout  
   -`index.pug`              # List all reviews  
   -`new.pug`                # New review form  
   -`edit.pug`               # Edit review form  