const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Compass");
}).catch((err) => {
  console.error("Error connecting to MongoDB Compass", err);
});

// const mongoose = require('mongoose');

// const connectDB = async () => {

//     mongoose.connection.on('connected', () => {
//         console.log("connection established")
//     });

//     await mongoose.connect(`${process.env.MONGODB_URI}`)

// }

// export default connectDB;