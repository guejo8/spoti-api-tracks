
const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const DB_URI = process.env.DB_URI;
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('**** CONEXION CORRECTA ****');
    } catch (err) {
        console.error('***** ERROR DE CONEXION ****', err);
        process.exit(1); // Salir del proceso si hay un error
    }
};

module.exports = { dbConnect };
