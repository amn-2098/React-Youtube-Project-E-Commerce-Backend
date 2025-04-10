// // // const multer = require('multer');
// // // const path = require('path');
// // // const router = require('router')

// // // // Storage Configuration
// // // const storage = multer.diskStorage({
// // //     destination: './public/images/uploads', // Folder for uploaded images
// // //     filename: (req, file, cb) => {
// // //         cb(null, `${Date.now()}-${file.originalname}`);
// // //     }
// // // });

// // // // File Filter for Images Only
// // // const fileFilter = (req, file, cb) => {
// // //     const allowedTypes = /jpeg|jpg|png/;
// // //     const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// // //     const mimeType = allowedTypes.test(file.mimetype);

// // //     if (extName && mimeType) {
// // //         cb(null, true);
// // //     } else {
// // //         cb(new Error('Only images are allowed (jpeg, jpg, png)!'));
// // //     }
// // // };
// // // router.post('/add', upload.single('image'), addToCart); // 'image' must match form field

// // // module.exports = multer({ storage, fileFilter });



// // const multer = require('multer');
// // const path = require('path');

// // // Storage Configuration
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, './public/images/uploads'); // Ensure this folder exists
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, `${Date.now()}-${file.originalname}`);
// //     }
// // });

// // // File Filter for Images Only
// // const fileFilter = (req, file, cb) => {
// //     const allowedTypes = /jpeg|jpg|png/;
// //     const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //     const mimeType = allowedTypes.test(file.mimetype);

// //     if (extName && mimeType) {
// //         cb(null, true);
// //     } else {
// //         cb(new Error('Only images are allowed (jpeg, jpg, png)!'));
// //     }
// // };

// // // Initialize Multer
// // const upload = multer({ storage, fileFilter });

// // module.exports = upload; // ✅ Export `upload`, not `multer()`




// const multer = require('multer');
// const path = require('path');

// // Set up the storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Store images in the 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp for unique file names
//     }
// });

// // Define file filter (only allow images)
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = allowedTypes.test(file.mimetype);

//     if (extName && mimeType) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only images are allowed (jpeg, jpg, png)!'));
//     }
// };

// // Initialize multer with storage and file filter
// const upload = multer({ storage, fileFilter });

// module.exports = upload;



const multer = require('multer');
const path = require('path');

// Define storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Set the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the filename to be unique
    }
});

// File filter (optional, to restrict file types)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid file type'), false);
    }
};

// Initialize Multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // Max file size 5MB
});

module.exports = upload;
