const { get } = require('../app');
const { Album, Artista } = require('../models');


const createAlbum = async (req, res) => {
    try {
        const { nombre_album, artista_id, discografica_id, imagen_portada, anio_lanzamiento } = req.body;
        
        const newAlbum = await Album.create({
            nombre_album,
            artista_id,
            discografica_id,
            imagen_portada,
            anio_lanzamiento
        });
        
        res.status(201).json({
            success: true,
            message: "Álbum creado exitosamente",
            data: newAlbum
        });
        
    } catch (error) {
        console.log('❌ ERROR:', error.name);
        
        // Manejar error de nombre duplicado
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({  // 409 Conflict
                success: false,
                message: "Ya existe un álbum con ese nombre",
                error: `El álbum '${error.errors[0].value}' ya existe en la base de datos`
            });
        }
        
        // Manejar error de foreign key
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                success: false,
                message: "El artista o discográfica no existe",
                error: "Verifica que los IDs de artista y discográfica sean válidos"
            });
        }
        
        // Error genérico
        res.status(500).json({
            success: false,
            message: "Error al crear el álbum",
            error: error.message
        });
    }
};



const getAllAlbumes = async (req, res) => {
    try {
        const albumes = await Album.findAll({
            order: [['nombre_album', 'ASC']]
        });
        res.status(200).json(albumes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los álbumes', error });
    }
};

const getAlbumByArtistId = async (req, res) => {
    try {
        const { artista_id } = req.params;
        
        const artista = await Artista.findByPk(artista_id);
        if (!artista) {
            return res.status(404).json({
                success: false,
                message: "Artista no encontrado",
                error: `No existe un artista con ID: ${artista_id}`
            });
        }
        
        const albumes = await Album.findAll({
            where: { artista_id },
            order: [['nombre_album', 'ASC']]
        });
        
        if (albumes.length === 0) {
            return res.status(200).json({
                success: true,
                message: `El artista '${artista.nombre_artista}' no tiene álbumes registrados`,
                data: [],
                artista: {
                    id: artista.artista_id,
                    nombre: artista.nombre_artista
                }
            });
        }
        
        res.status(200).json({
            success: true,
            message: `Álbumes encontrados para ${artista.nombre_artista}`,
            data: albumes,
            count: albumes.length,
            artista: {
                id: artista.artista_id,
                nombre: artista.nombre_artista
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los álbumes por artista',
            error: error.message
        });
    }
}

const getCancionesByAlbumId = async (req, res) => {
    try {       
        const { album_id } = req.params;
        const canciones = await Cancion.findAll({
            where: { album_id: album_id }
        });
        
        const album = await Album.findByPk(album_id);
        if (!album) {
            return res.status(404).json({ message: 'Álbum no encontrado' });
        }
        
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las canciones del álbum', error });
    }
}

module.exports = {
    getAllAlbumes,
    createAlbum,
    getAlbumByArtistId,
    getCancionesByAlbumId
};