// Importing necessary libraries and modules
const express = require('express');  
const dotenv = require('dotenv');    
const cors = require('cors');        
const bodyparser = require('body-parser');  // Importing body-parser to parse incoming request bodies
const fileUpload = require('express-fileupload'); // Importing express-fileupload to handle file uploads

// Load environment variables from the .env file
dotenv.config(); // Automatically loads environment variables defined in .env file into process.env

// Initialize the Express application
const app = express(); // Creates an instance of the Express application

// Define the port number by reading from environment variables
const port = process.env.PORT; // Access the PORT value from the .env file

// Enable CORS and configure allowed origins
app.use(cors({
    origin: [
        'http://localhost:3000', // Allow requests from this origin
        'http://localhost:3001', // Allow requests from this origin
        'http://localhost:3002', // Allow requests from this origin
        'http://localhost:3003', // Allow requests from this origin
        "https://pinerockcreditunion.com" // Allow requests from production site
    ]
}));

// Middleware to parse URL-encoded form data
app.use(bodyparser.urlencoded({ extended: true }));
// Middleware to parse incoming JSON request bodies
app.use(bodyparser.json());

// Custom middleware to set the Content-Type header for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Ensures the response is always JSON
    next(); // Move to the next middleware or route handler
});

// Enable file uploads using express-fileupload
app.use(fileUpload()); // This will allow the server to accept file uploads

// Serve static files from the "public" directory
app.use(express.static('public'));

// api routes
app.use('api/v1/user', require('./routes/userRoute')); 
app.listen(port, () => console.log(`server running on http://localhost:${port}`));

