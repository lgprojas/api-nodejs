const mongoose = require('mongoose');
require('dotenv').config();

// const { MONGODB_HOST, MONGODB_DATABASE } =process.env;
// const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;


 const { MONGODB_HOST_WEB, MONGODB_USU_WEB, MONGODB_PASS_WEB, MONGODB_DATABASE_WEB } =process.env;
const MONGODB_URI = `${MONGODB_HOST_WEB}://${MONGODB_USU_WEB}:${MONGODB_PASS_WEB}@cluster0.8vqmh25.mongodb.net/${MONGODB_DATABASE_WEB}?retryWrites=true&w=majority`;

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
