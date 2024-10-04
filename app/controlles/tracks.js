const { httpError } = require('../helpers/handleError');
const Track = require('../models/tracks'); 
const PORT = process.env.PORT || 3000;
const URL_PUBLIC = process.env.URL_PUBLIC || '/';


const listAll = [
    {
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
            "nickname": "Pink",
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
];


  //Obtener todas las pistas o realizar una búsqueda filtrada
 
const getItems = async (req, res) => {
    try {
        const searchTerm = req.query.src; // Obtiene el término de búsqueda
        console.log('Término de búsqueda:', searchTerm); // Para depuración

        let filteredTracks = listAll; 
        // Filtrar por término de búsqueda solo si se proporciona
        if (searchTerm && searchTerm.length >= 3) {
            const term = searchTerm.toLowerCase(); 
            filteredTracks = listAll.filter(track => {
                // Verifica si el nombre de la pista o el nombre del artista incluye el término
                return track.name.toLowerCase().includes(term) || 
                       track.artist.name.toLowerCase().includes(term);
            });

            console.log('Pistas filtradas:', filteredTracks); // Para depuración
        } else {
            console.log('No se aplicó filtrado, se devuelven todas las pistas.'); // Mensaje de depuración
        }

        res.send({ data: filteredTracks }); // Envía la lista filtrada o completa
    } catch (e) {
        httpError(res, e); 
    }
};


  //Obtener una pista específica por su ID
 
const getItem = (req, res) => {
    try {
        const id = parseInt(req.params.id); // Obtener el ID de los parámetros de la URL
        const track = listAll.find(item => item._id === id); // Buscar la pista por ID

        if (!track) {
            return res.status(404).send({ message: 'Track not found' });
        }

        res.send({ data: track });
    } catch (e) {
        httpError(res, e);
    }
};


   //Crear una nueva pista musical
 
const createItem = async (req, res) => {
    try {
        const { name, album, cover, artist, duration, url } = req.body; 

        // Crear una nueva instancia del modelo Track
        const newTrack = new Track({
            _id: listAll.length + 1,  // Crear un nuevo ID incremental
            name,
            album,
            cover,
            artist,
            duration,
            url: `${URL_PUBLIC}/${url}`  
        });

        // Validar y guardar la nueva pista
        await newTrack.validate(); 
        listAll.push(newTrack);  
        res.send({ data: newTrack });
    } catch (e) {
        httpError(res, e);
    }
};


  //Actualizar una pista existente por su ID
 
const updateItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, album, cover, artist, duration, url } = req.body;

        const trackIndex = listAll.findIndex(item => item._id === id);

        if (trackIndex === -1) {
            return res.status(404).send({ message: 'Track not found' });
        }

        // Crear un nuevo objeto Track con los valores actualizados
        const updatedTrack = {
            _id: id,
            name: name || listAll[trackIndex].name,
            album: album || listAll[trackIndex].album,
            cover: cover || listAll[trackIndex].cover,
            artist: artist || listAll[trackIndex].artist,
            duration: duration || listAll[trackIndex].duration,
            url: url ? `${URL_PUBLIC}/${url}` : listAll[trackIndex].url
        };

        // Validar y actualizar la pista
        const trackInstance = new Track(updatedTrack);
        await trackInstance.validate(); 
        listAll[trackIndex] = trackInstance; 

        res.send({ data: listAll[trackIndex] });
    } catch (e) {
        httpError(res, e);
    }
};


 //Eliminar una pista por su ID
 
const deleteItem = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const trackIndex = listAll.findIndex(item => item._id === id);

        if (trackIndex === -1) {
            return res.status(404).send({ message: 'Track not found' });
        }

        
        const deletedTrack = listAll.splice(trackIndex, 1);

        res.send({ data: deletedTrack });
    } catch (e) {
        httpError(res, e);
    }
};

module.exports = { getItem, getItems, deleteItem, createItem, updateItem };
