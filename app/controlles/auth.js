const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/users')

//TODO: Login!
const loginCtrl = async(req, res) => {
    try {

        const mockUser = {
            name: 'Jone G',
            email: 'test@test.com',
            password: '12345678',
            avatar: 'https://es.wikipedia.org/wiki/Hibiscus#/media/Archivo:Favourite_flowers_of_garden_and_greenhouse_(Pl._49)_(7789088308).jpg'
        }

        const { email, password } = req.body


        if (mockUser.email !== 'test@test.com') {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = (mockUser.password === password)

        // JWT 
        const tokenSession = await tokenSign(mockUser) 

        if (checkPassword) { // Contraseña es correcta
            res.send({
                data: mockUser,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

//Registramos usuario
const registerCtrl = async(req, res) => {
    try {
        //Datos enviados desde el front 
        const { email, password, name } = req.body

        const passwordHash = await encrypt(password) //Encriptando
        const registerUser = await userModel.create({
            email,
            name,
            password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { loginCtrl, registerCtrl }



