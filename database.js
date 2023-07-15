const mongoose = require('mongoose');
require('dotenv').config();


// const { MONGODB_HOST, MONGODB_DATABASE } =process.env;
// const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;

const MONGODB_URI = `mongodb+srv://lgprojas:7v5LLErB9YFOKnK6@cluster0.8vqmh25.mongodb.net/api?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
