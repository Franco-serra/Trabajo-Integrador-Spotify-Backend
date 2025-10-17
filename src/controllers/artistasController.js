const { Artista, Album, Cancion } = require('../models');

// Obtener todos los artistas
const getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll({
            order: [['nombre_artista', 'ASC']]
        });

        res.json({
            success: true,
            count: artistas.length,
            data: artistas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error obteniendo artistas",
            details: error.message
        });
    }
};

// Obtener artista por ID
const getArtistaById = async (req, res) => {
    try {
        const { id } = req.params;
        const artista = await Artista.findByPk(id, {
            // SI SE UTILIZAN ESTAS LINEAS DE CODIGO COMENTADAS, EL ENDPOINT AL EJECUTARSE MOSTRARA LOS ALBUMES
            // DE CADA ARTISTA.
            // include: [
            //     {
            //         model: Album,
            //         include: [Cancion]     
            //     }
            // ]
        });

        if (!artista) {
            return res.status(404).json({
                success: false,
                error: "Artista no encontrado"
            });
        }

        res.json({
            success: true,
            data: artista
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error obteniendo artista",
            details: error.message
        });
    }
};

// Obtener artistas con paginación
const getArtistasPaginados = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: artistas } = await Artista.findAndCountAll({
            limit,
            offset,
            order: [['nombre_artista', 'ASC']]
        });

        res.json({
            success: true,
            pagination: {
                page,
                limit,
                total: count,
                pages: Math.ceil(count / limit)
            },
            data: artistas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error obteniendo artistas",
            details: error.message
        });
    }
};


const createArtista = async (req, res) => {
    try {
        const { nombre_artista, imagen } = req.body;
        const nuevoArtista = await Artista.create({ nombre_artista, imagen });

        res.status(201).json({
            success: true,
            data: nuevoArtista
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error creando artista",
            details: error.message
        });
    }
};

module.exports = {
    getAllArtistas,
    getArtistaById,
    getArtistasPaginados,
    createArtista
};