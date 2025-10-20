const { Sequelize, Op } = require('sequelize');
const { Album, Cancion, Genero, CancionGenero } = require('../models');

const createCancion = async (req, res) => {
    try {
        const {
            nombre_cancion,
            duracion_min, 
            reproducciones, 
            likes, 
            album_id 
        } = req.body
        if (!nombre_cancion || nombre_cancion.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'El nombre de la canción es requerido'
            });
        }
                if (album_id) {
            if (isNaN(album_id)) {
                return res.status(400).json({
                    success: false,
                    message: 'El ID del álbum debe ser un número válido'
                });
            }

            const album = await Album.findByPk(album_id);
            if (!album) {
                return res.status(404).json({
                    success: false,
                    message: `El álbum con ID ${album_id} no existe`
                });
            }
        }
                
        if (duracion_min !== undefined && duracion_min !== null) {
            if (!Number.isInteger(duracion_min)) {
                return res.status(400).json({
                    success: false,
                    message: 'ERROR: duracion en mm.ss',
                    error: 'FORMATO_DURACION_INVALIDO',
                    detalle: `Se recibió: ${duracion_min} (tipo: ${typeof duracion_min})`
                });
            }
            
            
            if (duracion_min < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'La duración no puede ser negativa'
                });
            }
        }
        const nuevaCancion = await Cancion.create({
            nombre_cancion: nombre_cancion.trim(),
            duracion_min: duracion_min || null,
            reproducciones: reproducciones || 0,
            likes: likes || 0,
            album_id: album_id || null
        })
        console.log('✅ Canción creada:', nuevaCancion.cancion_id);
        res.status(200).json({
            success:true,
            message: 'Canción creada exitosamente',
            data: nuevaCancion
        })    
    } catch (error) {
        console.error('❌ Error al crear canción:', error);

        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'El nombre de la canción ya existe'
            });
        }

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al crear la canción',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getCancionesConFiltros = async (req, res) => {
    try {
        const { genero, albumId, limit = 50, offset = 0 } = req.query;

        console.log('🔍 Filtros recibidos:', req.query);


        const whereConditions = {};
        

        if (albumId) {
            if (isNaN(albumId)) {
                return res.status(400).json({
                    success: false,
                    message: 'El ID del álbum debe ser un número válido'
                });
            }
            whereConditions.album_id = parseInt(albumId);
        }


        const opciones = {
            where: whereConditions,
            include: [],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['nombre_cancion', 'ASC']]
        };

        if (genero) {
            opciones.include.push({
                model: Genero,
                through: { attributes: [] }, 
                where: { 
                    nombre_genero: {
                        [Sequelize.Op.like]: `%${genero}%`
                    }
                }
            });
        } else {

            opciones.include.push({
                model: Genero,
                through: { attributes: [] }
            });
        }


        opciones.include.push({
            model: Album,
            attributes: ['album_id', 'nombre_album', 'artista_id']
        });


        const canciones = await Cancion.findAll(opciones);

        console.log(`🎵 Canciones encontradas: ${canciones.length}`);

        res.status(200).json({
            success: true,
            data: canciones,
            total: canciones.length,
            filtros: {
                genero: genero || 'sin filtro',
                albumId: albumId || 'sin filtro',
                limit: parseInt(limit),
                offset: parseInt(offset)
            }
        });

    } catch (error) {
        console.error('❌ Error al obtener canciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener las canciones',
            error: error.message
        });
    }
}

const asociarGeneroCancion = async (req, res) => {
    try {
        const { cancion_id } = req.params; 
        const { genero_id } = req.body;    

        console.log('🔍 Parámetros URL:', req.params);
        console.log('🔍 Body recibido:', req.body);
        console.log('🎵 Asociando género a canción:', { cancion_id, genero_id });


        if (!cancion_id) {
            return res.status(400).json({
                success: false,
                message: 'cancion_id es requerido en la URL'
            });
        }

        if (!genero_id) {
            return res.status(400).json({
                success: false,
                message: 'genero_id es requerido en el body'
            });
        }

        if (isNaN(cancion_id) || isNaN(genero_id)) {
            return res.status(400).json({
                success: false,
                message: 'cancion_id y genero_id deben ser números válidos'
            });
        }

        const cancionId = parseInt(cancion_id);
        const generoId = parseInt(genero_id);


        const cancion = await Cancion.findByPk(cancionId);
        if (!cancion) {
            return res.status(404).json({
                success: false,
                message: `La canción con ID ${cancionId} no existe`
            });
        }

        const genero = await Genero.findByPk(generoId);
        if (!genero) {
            return res.status(404).json({
                success: false,
                message: `El género con ID ${generoId} no existe`
            });
        }

        const nuevaAsociacion = await CancionGenero.create({
            cancion_id: cancionId,
            genero_id: generoId
        });

        res.status(201).json({
            success: true,
            message: 'Género asociado a la canción exitosamente',
            data: {
                asociacion_id: nuevaAsociacion.cancion_genero_id,
                cancion: {
                    id: cancion.cancion_id,
                    nombre: cancion.nombre_cancion
                },
                genero: {
                    id: genero.genero_id,
                    nombre: genero.nombre_genero
                }
            }
        });

    } catch (error) {
        console.error('❌ Error al asociar género a canción:', error);
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Esta canción ya tiene asociado este género'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

const eliminarGeneroCancion = async (req, res) => {
    try {
        const { cancion_id, genero_id } = req.params; 

        console.log('🗑️ Eliminando género de canción:', { cancion_id, genero_id });

        if (isNaN(cancion_id) || isNaN(genero_id)) {
            return res.status(400).json({
                success: false,
                message: 'cancion_id y genero_id deben ser números válidos'
            });
        }

        const cancionId = parseInt(cancion_id);
        const generoId = parseInt(genero_id);

        const asociacion = await CancionGenero.findOne({
            where: {
                cancion_id: cancionId,
                genero_id: generoId
            }
        });

        if (!asociacion) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la asociación entre esta canción y género'
            });
        }

        await CancionGenero.destroy({
            where: {
                cancion_id: cancionId,
                genero_id: generoId
            }
        });

        console.log('✅ Asociación eliminada:', { cancionId, generoId });

        res.status(200).json({
            success: true,
            message: 'Género eliminado de la canción exitosamente',
            data: {
                cancion_id: cancionId,
                genero_id: generoId
            }
        });

    } catch (error) {
        console.error('❌ Error al eliminar género de canción:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al eliminar el género de la canción',
            error: error.message
        });
    }
};

module.exports = {
    createCancion,
    getCancionesConFiltros,
    asociarGeneroCancion,
    eliminarGeneroCancion,
}