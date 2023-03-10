const mongoose = require('mongoose');
// let ur = "mongodb://0.0.0.0:27017/olxx"

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Mongoose connection error: ' + err);
});

const db = mongoose.connection;

db.on('error', () => {
    console.log('Error connecting to Database');
});

// db.once('open', () => {
//     console.log('Connected to Database');
// });
