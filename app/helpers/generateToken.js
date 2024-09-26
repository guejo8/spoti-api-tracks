const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id, // Identificador del usuario
            role: user.role
        },
        process.env.JWT_SECRET, // Secreto de JWT definido en el entorno
        {
            expiresIn: "2h", // Tiempo de vida del token
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null; // Devuelve null si hay un error
    }
}

const decodeSign = (token) => {
    return jwt.decode(token, null); // Decodifica el token sin verificar
}

module.exports = { tokenSign, decodeSign, verifyToken };
