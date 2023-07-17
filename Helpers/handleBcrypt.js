const bcrypt = require('bcryptjs');

const encrypt = (clave) => {
    const hash = bcrypt.hash(clave, 10)
    return hash
}

const compare = (passwordLogin, passwordEncrypt) => {
    return bcrypt.compare(passwordLogin, passwordEncrypt)
}

module.exports = {
    encrypt,
    compare
}