// const express = require('express');
// const connectDB = require('./db.js');
// const dotenv = require('dotenv');
// const path = require('path')

// const cartRoutes = require('./routes/cartRoute'); // Correct file name and path
// const productRoutes = require('./routes/productRoute'); // Correct file name and path
// const categoryRoute = require('./routes/categoryRoute'); // Correct file name and path
// const authRoute = require('./routes/authRoute.js')


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// connectDB();

// const cors = require('cors');

// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));


// // app.get('/api/cart', (req, res) => {
// //     res.json({ message: 'Cart data' });
// // });



// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.sendStatus(200);
// });



// app.use(express.json());  // Parse JSON requests


// // Use cart routes
// app.use('/api/cart', cartRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoute);  // Category routes
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/auth', authRoute);




// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const connectDB = require('./db.js');
const dotenv = require('dotenv');
const path = require('path');

const cartRoutes = require('./routes/cartRoute');
const productRoutes = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute.js');
const orderRoute = require('./routes/orderRoute.js')
const contactRoutes = require('./routes/contactRoute.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const cors = require('cors');

// Configure CORS to allow frontend requests from specific origin
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files (e.g., images) from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes for cart, products, categories, and authentication
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoute);
app.use('/api/auth', authRoute);
app.use('/api/order',orderRoute);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
