const { httpError } = require('../helpers/handleError')
const userModel = require('../models/users')
const PORT = process.env.PORT || 3000
const URL_PUBLIC = process.env.URL_PUBLIC || '/'
const getItems = async(req, res) => {
    try {
        const listAll = [{
                "_id": 1,
                "name": "Rolling in the Deep",
                "album": "21",
                "cover": "https://www.hoyesarte.com/constelac10n/files/2020/01/008.jpg",
                "artist": {
                    "name": "Adele",
                    "nickname": "Adele",
                    "nationality": "GRB"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track.mp3`
            },
            {
                "_id": 2,
                "name": "Vivo por ella",
                "album": "Duets",
                "cover": "https://files.lafm.com.co/assets/public/styles/img_node_706x392/public/2024-08/boce.jpg.webp?VersionId=loyEK1NY3Z1wVfIfCVySzPZtl4tbMxuA&itok=aDwZ6QZ1",
                "artist": {
                    "name": "Andrea Bocelli & Karol G",
                    "nickname": "Andrea Bocelli & Karol G",
                    "nationality": "ITA"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-1.mp3`
            },
            {
                "_id": 3,
                "name": "What about us",
                "album": "Beautiful Trauma",
                "cover": "https://image.europafm.com/clipping/cmsimages02/2024/08/23/3FAF1E4D-D126-432E-8E2D-2BDAB800BDFC/pink-hija-convencion-nacional-democrata_97.jpg?crop=5500,3094,x0,y0&width=1600&height=900&optimize=low&format=webply",
                "artist": {
                    "name": "Pink",
                    "nickname":"Pink",
                    "nationality": "USA"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-2.mp3`
            },
            {
                "_id": 4,
                "name": "Bad Habits",
                "album": "Ed Sheeran",
                "cover": "https://www.lahiguera.net/musicalia/artistas/ed_sheeran/disco/11372/tema/25301/ed_sheeran_bad_habits-portada.jpg",
                "artist": {
                    "name": "Ed Sheeran",
                    "nickname": "Ed Sheeran",
                    "nationality": "GRB"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-4.mp3`
            },
            {
                "_id": 5,
                "name": "The night comes down",
                "album": "QUEEN",
                "cover": "https://www.prensalibre.com/wp-content/uploads/2020/06/55003233444_1.jpg?resize=2048,1363",
                "artist": {
                    "name": "Queen",
                    "nickname": "Queen",
                    "nationality": "GRB"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-3.mp3`
            },
            {
                "_id": 6,
                "name": "T.N.T. (Live At River Plate, December 2009)",
                "album": "AC/DC",
                "cover": "https://cdns-images.dzcdn.net/images/cover/ba5eaf2f3a49768164d0728b7ba64372/500x500.jpg",
                "artist": {
                    "name": "AC/DC",
                    "nickname": "AC/DC",
                    "nationality": "US"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-5.mp3`
            },
            {
                "_id": 7,
                "name": "Acrostico",
                "album": "Las mujeres ya no lloran",
                "cover": "https://images.milenio.com/P93kYBgdkU2y2AzqoNsGsb5K5dA=/942x532/uploads/media/2023/05/13/shakira-melodia-de-acrostico-fue.jpg",
                "artist": {
                    "name": "Shakira",
                    "nickname": "Shakira",
                    "nationality": "COL"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-6.mp3`
            },
            {
                "_id": 8,
                "name": "You are still the one",
                "album": "Come on over",
                "cover": "https://pics.filmaffinity.com/shania_twain_you_re_still_the_one-288959442-large.jpg",
                "artist": {
                    "name": "Shania Twain",
                    "nickname": "Shania Twain",
                    "nationality": "CAN"
                },
                "duration": {
                    "start": 0,
                    "end": 333
                },
                "url": `${URL_PUBLIC}/track-7.mp3`
            }
        ]
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = (req, res) => {

}

const createItem = async(req, res) => {
    try {
        const { name, age, email } = req.body
        const resDetail = await userModel.create({
            name,
            age,
            email
        })
        res.send({ data: resDetail })
    } catch (e) {
        httpError(res, e)
    }
}


const updateItem = (req, res) => {

}

const deleteItem = (req, res) => {

}

module.exports = { getItem, getItems, deleteItem, createItem, updateItem }