# Book Review App

## About the App
This dynamic web application was developed as part of the Web Technologies module (4BUIS011C) coursework at Westminster International University in Tashkent (WIUT). It enables users to manage book reviews through full CRUD functionality: **Create** new reviews with details (title, author, genre, and review text), **Read** a list of all reviews, **Update** existing reviews to refine details, and **Delete** reviews they no longer wish to keep. 

The app leverages **Express.js** and **Node.js** as the foundational web framework, adhering to the coursework’s requirement. It uses **Pug** as the template engine to dynamically render views on the server side, and **method-override** to support RESTful HTTP methods (PUT/DELETE) in HTML forms. The application follows a client-server architecture where the server handles requests, processes data, and serves HTML responses to the client (browser). Data is stored in-memory for simplicity, though this could be extended to a database like SQLite or MongoDB for persistence.

The UI is intentionally minimalistic, styled with basic CSS, focusing on functionality over aesthetics as per the coursework brief. Key features include proper route grouping, error handling for invalid inputs, and deployment to a live server for global access. This project demonstrates how modern web frameworks simplify development by providing routing, middleware, and templating tools.

**Disclaimer**: This web application was created to fulfill Web Technology module’s requirements and does not represent an actual company or service.

## How to Run the App Locally
Follow these detailed steps to set up and run the application on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/book-review-app.git
   cd book-review-app



   /book-review-app
  ├── app.js              # Entry point: Initializes Express, sets up middleware, view engine, and routes
  ├── package.json        # Configuration file: Defines metadata, dependencies, and start script
  ├── .gitignore          # Excludes node_modules/ from Git to keep the repo lightweight
  ├── /public             # Static assets served to the client
  │   └── /styles         # Subdirectory for CSS
  │       └── style.css   # Defines minimalistic styling (e.g., fonts, spacing, button colors)
  ├── /routes             # Defines URL endpoints and maps them to controllers
  │   ├── index.js        # Handles the root route (/), rendering the review list
  │   └── reviews.js      # Groups review-related routes (e.g., /reviews, /reviews/new, /reviews/:id/edit)
  ├── /controllers        # Processes requests and interacts with services
  │   └── reviews.js      # Contains logic for CRUD operations, error handling, and view rendering
  ├── /services           # Manages business logic and data operations
  │   └── reviews.js      # Implements in-memory CRUD functions (could be swapped for a database)
  ├── /views              # Pug templates for server-side rendering
  │   ├── layout.pug      # Base template with shared HTML structure (head, CSS link)
  │   ├── index.pug       # Homepage: Displays reviews and includes the coursework disclaimer
  │   ├── new.pug         # Form for creating reviews with input validation (required fields)
  │   └── edit.pug        # Form for updating reviews, pre-filled with existing data



  app.js: The central file that:
Configures Express with middleware (express.urlencoded for form data, express.static for public files, method-override for RESTful methods).
Sets Pug as the view engine and specifies the /views directory.
Mounts route handlers (/ and /reviews) to process client requests.
Includes error-handling middleware to catch runtime errors, meeting the error-handling requirement.
/public: Stores static files like style.css, served directly to the client. This separation keeps the frontend assets accessible without server-side processing, optimizing load times.
/routes: Implements route grouping (e.g., /reviews prefix) for clarity and scalability. Each file:
index.js: Serves the homepage, delegating to the controller for review data.
reviews.js: Defines RESTful routes (GET, POST, PUT, DELETE) for CRUD, showcasing Learning Outcome ---
5 (“define routes and logic/controllers”).

/controllers: Acts as the middle layer between routes and services:
reviews.js: Processes incoming requests, validates inputs (e.g., checking for missing fields), calls service methods, and renders Pug templates with data. This separation keeps routes lean and focused on URL mapping.
/services: Encapsulates data logic:
reviews.js: Manages an in-memory array of reviews with methods for CRUD operations. Using a service layer isolates data handling from controllers, making it easy to swap in a database later (e.g., MongoDB). This demonstrates a modular design (Learning Outcome 6).
/views: Uses Pug for dynamic HTML generation:
layout.pug: Provides a reusable template with a <head> section (title, CSS link) and a block content for page-specific content.
index.pug: Lists all reviews with edit/delete options and includes the required disclaimer text.
new.pug and edit.pug: Render forms with client-side validation (required attributes), styled minimally via CSS.