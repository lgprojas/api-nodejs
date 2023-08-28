const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token: String,
},{versionKey: false});

const token = mongoose.model('Token', TokenSchema, 'tokens');

module.exports={
    Token:token,
}