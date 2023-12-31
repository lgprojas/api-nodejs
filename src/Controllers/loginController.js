const loginService = require('../Services/loginService');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../Middleware/jwt');


const loginUsu = async(req, res) => {

    
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    
    
    
    if (
        !usuario ||
        !clave
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "One of the values is empty",
            },
        });
        return;
    }

    const newLogin = {
        usuario: usuario,
        clave: clave
    }
    
    try{
    const datosUsu = await loginService.createNewLogin(newLogin);
    //res.status(200).send({ status: "OK", data: datosUsu });

 
    //if(datosUsu){
        const { _id, nombre, email} = datosUsu

        //aquí podría agregar el token a la session
        const token = generateToken({id: _id, email: email})
        const refreshToken = generateRefreshToken({id: _id, email: email})
    
        const saveTokenBD = await loginService.saveTokenBD(refreshToken)
        if(!saveTokenBD){
            res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                error:
                    "RefreshToken couldn't save",
                },
            });
            return;
        }
    
        const datosUsuToken = {nombre, email, token, refreshToken}
    
        res.status(200).send({ status: "OK", data: datosUsuToken });
    }catch(error){
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }

    
    
}

const refreshToken = async(req, res) => {

    //const {bearer, refreshToken} = req.headers.authorization.split(" ");
    const refreshToken = req.headers.authorization.split(" ")[1];

    if(!(refreshToken)){
        res.status(400).json({ message: "[Refresh] Something goes wrong!" });
    }

    const verifyResult = verifyRefreshToken(refreshToken);

    if(!(verifyResult)){
        res.status(400).json({ message: "[Refresh] RefreshToken incorrect!" });
    }

    try {
        //res.status(200).json({ data: refreshToken });
        //se debe verificar el refreshToke        

        //res.status(200).json({ data: verifyResult });
        //consulto si existe el email del token 
        const datosUsu = await loginService.createNewToken(verifyResult);

        if(datosUsu){
            const { _id, nombre, email} = datosUsu

            const token = generateToken({id: _id, email: email})

            const datosUsuToken = {id: _id, nombre, email, token}
    
        res.status(200).send({ message: "OK", data: datosUsuToken });
        }

    } catch (error) {
        return res.status(400).json({ message: "[Refresh] Something goes wrong 02!" });
    }
}

const signOut = async(req, res) => {

    //const {bearer, refreshToken} = req.headers.authorization.split(" ");
    const refreshToken = req.headers.authorization.split(" ")[1];
    console.log(refreshToken)
    if(!(refreshToken)){
        res.status(400).json({ message: "[Refresh] Something goes wrong!" });
    }

    const verifyResult = verifyRefreshToken(refreshToken);

    if(!(verifyResult)){
        res.status(400).json({ message: "[Refresh] RefreshToken incorrect!" });
    }

    try {

        const datosUsu = await loginService.signOut(refreshToken);

        if(datosUsu){   
            res.status(200).send({ message: "OK" });
        }

    } catch (error) {
        return res.status(400).json({ message: "[Refresh] Something goes wrong!!" });
    }
}

module.exports = {loginUsu, refreshToken, signOut}