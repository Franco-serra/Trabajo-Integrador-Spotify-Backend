const { get } = require('../app');
const { Album, Artista, Cancion } = require('../models');


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
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({  
                success: false,
                message: "Ya existe un álbum con ese nombre",
                error: `El álbum '${error.errors[0].value}' ya existe en la base de datos`
            });
        }

        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                success: false,
                message: "El artista o discográfica no existe",
                error: "Verifica que los IDs de artista y discográfica sean válidos"
            });
        }
        
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
        
        if (!album_id || isNaN(album_id)) {
            return res.status(400).json({ 
                message: 'ID de álbum inválido' 
            });
        }
        
        const albumId = parseInt(album_id);
        
        const album = await Album.findByPk(albumId, {
            include: [{
                model: Cancion,
                as: 'canciones', 
                required: false 
            }]
        });
        
        if (!album) {
            return res.status(404).json({ 
                message: `Álbum con ID ${albumId} no encontrado` 
            });
        }
        
        res.status(200).json({
            success: true,
            album: {
                id: album.id,
                nombre: album.nombre,
                artista: album.artista
            },
            canciones: album.canciones || [],
            total: album.canciones ? album.canciones.length : 0
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener las canciones', 
            error: error.message 
        });
    }
}

module.exports = {
    getAllAlbumes,
    createAlbum,
    getAlbumByArtistId,
    getCancionesByAlbumId
};