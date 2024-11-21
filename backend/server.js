// Importing necessary libraries and modules
const express = require('express'); 
const dotenv = require('dotenv');    
const cors = require('cors');        
const bodyparser = require('body-parser'); 
const fileUpload = require('express-fileupload'); 

// Load environment variables from the .env file
dotenv.config(); // Automatically loads environment variables defined in .env file into process.env

// Initialize the Express application
const app = express(); // Creates an instance of the Express application


const port = process.env.PORT; 

// Enable CORS and configure allowed origins
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'http://localhost:3001', 
        'http://localhost:3002', 
        'http://localhost:3003', 
 
    ]
}));

// Middleware to parse URL-encoded form data
app.use(bodyparser.urlencoded({ extended: true }));
// Middleware to parse incoming JSON request bodies
app.use(bodyparser.json());
app.get('/', (req, res) => {
    res.send('Server is running!');
    console.log('server running')
  });

// Custom middleware to set the Content-Type header for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Ensures the response is always JSON
    next(); // Move to the next middleware or route handler
});

// Enable file uploads using express-fileupload
app.use(fileUpload()); // This will allow the server to accept file uploads

// Serve static files from the "public" directory
app.use(express.static('public')); // Any files in the 'public' folder can be accessed directly via the URL

//api routes
app.use('/v1/user', require('./routes/UserRoutes')); 
app.listen(port, () => console.log(`server running on http://localhost:${port}`));

