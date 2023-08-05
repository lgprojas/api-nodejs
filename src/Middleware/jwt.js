const { ObjectId } = require('bson');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = ({ id, email }) => {

    const token_key = process.env.TOKEN_KEY;

    const idUser = new ObjectId(id).valueOf()//quita el ObjectId

    const token = jwt.sign(
        {userId:idUser, email:email},
        token_key,
        {expiresIn: "5s"}
    );
    return token
}

const generateRefreshToken = ({ id, email }) => {

    const refresh_token_key = process.env.REFRESH_TOKEN_KEY;

    const idUser = new ObjectId(id).valueOf()//quita el ObjectId

    const refreshToken = jwt.sign(
        {userId:idUser, email:email},
        refresh_token_key,
        {expiresIn: "2h"}
    );
    return refreshToken
}

const verifyToken = (req, res, next) => {
    const token_key = process.env.TOKEN_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    
    if(token==null)
        return res.status(401).send("Token requerido");

    jwt.verify(token, token_key, (err, user) => {
        if(err) return res.status(403).send('Token inválido');
        console.log(user);
        req.user = user;
        next();
    });
}

const verifyRefreshToken = (req, res) => {
    const refresh_token_key = process.env.REFRESH_TOKEN_KEY;
    const refreshToken = req;

    
    if(refreshToken==null)
        return res.status(401).send("Refresh Token requerido");

    const datosUsu = jwt.verify(refreshToken, refresh_token_key, (err, user) => {
        if(err) return;

        return user
    });

    return datosUsu
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
}