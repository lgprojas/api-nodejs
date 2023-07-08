const express = require("express");
const cors = require("cors");
//const { encrypt, compare } = require('./Helpers/handleBcrypt');
const { v4: uuidv4 } = require('uuid');

require('./database');

require('dotenv').config();
// const token_key = process.env.TOKEN_KEY;
/*
const { generateToken, verifyToken } = require('./Middleware/jwt');
*/
//Sin Routes
/*
const Usuario = require('./Schemas/usuarioSchema.js')
*/

//const Producto = require('./Models/ProductoModel.js')

//Con Routes
const v1Router = require("./v1/routes");
const v1RouterLogin = require("./v1/routes/loginRoutes");
const v1RouterUsu = require("./v1/routes/usuarioRoutes");
/*
const v1RouterProd = require("./v1/routes/productoRoutes");
const ProductoModel = require("./Schemas/productoModel");
*/

//Routes

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/v1", v1Router);// /api/v1 solo es un nombre ficticio

/*
//login para obtener token
app.post("/usuario/login", async(req, res) => {
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    const datosUsu = await Usuario.findOne({ usuario: usuario }).lean();//quita state, etc
    if(!datosUsu){
        res.status(404)
        res.send({ error: "User not found"})
    }

    const checkPassword = compare(clave, datosUsu.clave)

    const token = generateToken({id: datosUsu._id, email: datosUsu.email})
    
    if(checkPassword){

        const {nombre, email} = datosUsu
        //const nDatos = {...datosUsu, token}
        const nDatos = {nombre, email, token}
        res.send(nDatos);

    }else{
        res.status(409)
        res.send({
            error: "Invalid password"
        })
        return
    }

});

app.post("/usuario/getUsu", async(req, res) => {
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    const datosUsu = await Usuario.findOne({"usuario": usuario, "clave": clave})

    try{
        res.send(datosUsu);
        console.log(datosUsu);
    }catch(error){
        res.status(500).send(error);
    }
})

app.post("/usuario/insertUsu", async(req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const usuario = req.body.usuario;
    //const cod = req.body.codigo;
    const clave = req.body.clave;

    const cod = uuidv4();//genera cód único
    const password = await encrypt(clave);

    const allUsers = await new Usuario({ 
        nombre: nombre, 
        email: email,        
        codigo: cod,
        usuario: usuario,
        clave: password 
    }).save();

    try{
        res.send(allUsers);
        console.log(allUsers);
    }catch(error){
        res.status(500).send(error);
    }
})

//Servicio para mostrar datos 01 ejemplo
app.get("/usuario/:id/ventas", verifyToken, (req, res) => {
    const datos = [
        {id:1, cliente:"Empresa 01", total: 30000, fecha:"2023-05-31"},
        {id:2, cliente:"Empresa 02", total: 40000, fecha:"2023-06-01"},
        {id:3, cliente:"Empresa 03", total: 50000, fecha:"2023-07-01"},
    ];
    res.json(datos);
}); 

//Productos
app.get("/producto/listarProds", async(req, res) => {
    
    const allProds = await ProductoModel.find({ })
    try{
        res.send(allProds);
        console.log(allProds);
    }catch(error){
        res.status(500).send(error);
    }
})

app.get("/producto/getProd/:id", async(req, res) => {
    const id = req.params.id
    const prod = await ProductoModel.findById(id)
    try{
        res.send(prod);
        console.log(prod);
    }catch(error){
        res.status(500).send(error);
    }
})

app.post("/producto/insertProd", async(req, res) => {
    const nombre = req.body.nombre;
    const color = req.body.color;

    const allProds = await new ProductoModel({ nombre: nombre, color: color }).save();
    try{
        res.send(allProds);
        console.log(allProds);
    }catch(error){
        res.status(500).send(error);
    }
})

app.put("/producto/updateProd/:_id", async(req, res) => {
    
    const prod = await ProductoModel.updateOne(
        req.params,
        {$set: req.body}
        )
    try{
        res.send(prod);
        console.log(prod);
    }catch(error){
        res.status(500).send(error);
    }
})

app.delete("/producto/deleteProd/:_id", async(req, res) => {
    
    const prod = await ProductoModel.deleteOne(req.params)
    try{
        res.send(prod);
        console.log(prod);
    }catch(error){
        res.status(500).send(error);
    }
})

*/

//Con routes
app.use("/v1/loginRoutes", v1RouterLogin);
app.use("/v1/usuRoutes", v1RouterUsu);

/*
app.use("/v1/productoRoutes", verifyToken, v1RouterProd);//sólo una vez y reacciona depende del Method o parametros en GET(:id)


//Usuarios
app.get("/usuario/listarUsers", async (req, res) => {
    
    const allUsers = await Usuario.find({ nombre: "Luis" })

    try{
        res.send(allUsers);
        console.log(allUsers);
    }catch(error){
        res.status(500).send(error);
    }
})

*/
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Servidor iniciado para API NodeJS");
})
