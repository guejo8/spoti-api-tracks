require('dotenv').config()
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verifica que la variable se cargue correctamente

const epxress = require('express')
const cors = require('cors')
const app = epxress()
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(epxress.json())
app.use(epxress.static('public'));
app.use('/api/1.0', require('./app/routes'))

app.listen(PORT, () => {
    console.log(`Tu API es http://localhost:${PORT}/api/1.0`)
})