const { Playlist, PlaylistCancion } = require('../models')
const { Sequelize } = require('sequelize');

const crearPlaylist = async (req, res) => {
        try {
            const { nombre_playlist, usuario_id } = req.body;


            if (!nombre_playlist) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre de la playlist es requerido'
                });
            }
            const whereCondition = {
                nombre_playlist: Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('nombre_playlist')),
                    Sequelize.fn('LOWER', nombre_playlist)
                ),
                estado: 'activa'
            };
            if (usuario_id) {
                whereCondition.usuario_id = usuario_id;
            } else {
                whereCondition.usuario_id = null;
            }

            const playlistExistente = await Playlist.findOne({
                where: whereCondition
            });

            if (playlistExistente) {
                return res.status(409).json({
                    success: false,
                    message: `Ya existe una playlist activa con el nombre "${nombre_playlist}"`
                });
            }

            const nuevaPlaylist = await Playlist.create({
                nombre_playlist,
                usuario_id: usuario_id || null,
                estado: 'activa',
                cantidad_canciones: 0,
                fecha_creacion: new Date()
            });

            res.status(201).json({
                success: true,
                message: 'Playlist creada exitosamente',
                data: nuevaPlaylist
            });
        } catch (error) {
            console.error('Error al crear playlist:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al crear playlist',
                error: error.message
            });
        }
    };

const agregarCancion = async (req, res) => {
    try {
        const { playlist_id } = req.params;
        const { cancion_id, orden } = req.body;


        if (!cancion_id) {
            return res.status(400).json({
                success: false,
                message: 'El cancion_id es requerido'
            });
        }


        const playlist = await Playlist.findByPk(playlist_id);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist no encontrada'
            });
        }

        if (playlist.estado !== 'activa') {
            return res.status(400).json({
                success: false,
                message: 'No se pueden agregar canciones a una playlist eliminada'
            });
        }


        const cancionExistente = await PlaylistCancion.findOne({
            where: {
                playlist_id,
                cancion_id,
                activa: true
            }
        });

        if (cancionExistente) {
            return res.status(409).json({
                success: false,
                message: 'La canción ya está en la playlist'
            });
        }


        const relacionAnterior = await PlaylistCancion.findOne({
            where: {
                playlist_id,
                cancion_id,
                activa: false
            }
        });

        let nuevaRelacion;

        if (relacionAnterior) {

            nuevaRelacion = await relacionAnterior.update({
                activa: true,
                orden: orden || relacionAnterior.orden,
                fecha_agregado: new Date()
            });
        } else {

            const ultimaCancion = await PlaylistCancion.findOne({
                where: { playlist_id, activa: true },
                order: [['orden', 'DESC']]
            });

            const nuevoOrden = orden || (ultimaCancion ? ultimaCancion.orden + 1 : 1);


            nuevaRelacion = await PlaylistCancion.create({
                playlist_id: parseInt(playlist_id),
                cancion_id,
                orden: nuevoOrden,
                activa: true,
                fecha_agregado: new Date()
            });
        }


        await Playlist.increment('cantidad_canciones', {
            where: { playlist_id }
        });

        res.status(201).json({
            success: true,
            message: 'Canción agregada a la playlist exitosamente',
            data: nuevaRelacion
        });
    } catch (error) {
        console.error('Error al agregar canción a playlist:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al agregar canción',
            error: error.message
        });
    }
};

const quitarCancionDePlaylist = async (req, res) => {
    try {
        const { playlist_id, cancion_id } = req.params;


        const playlist = await Playlist.findByPk(playlist_id);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist no encontrada'
            });
        }


        const relacion = await PlaylistCancion.findOne({
            where: {
                playlist_id,
                cancion_id,
                activa: true
            }
        });

        if (!relacion) {
            return res.status(404).json({
                success: false,
                message: 'La canción no está en la playlist o ya fue removida'
            });
        }


        await relacion.update({
            activa: false
        });


        await Playlist.decrement('cantidad_canciones', {
            where: { playlist_id }
        });

        res.json({
            success: true,
            message: 'Canción removida de la playlist exitosamente'
        });
    } catch (error) {
        console.error('Error al remover canción de playlist:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al remover canción',
            error: error.message
        });
    }
};


const eliminarPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_eliminacion } = req.body;


        if (!fecha_eliminacion) {
            return res.status(400).json({
                success: false,
                message: 'El campo fecha_eliminacion es requerido para eliminar la playlist',
                code: 'FECHA_ELIMINACION_REQUERIDA'
            });
        }


        const playlist = await Playlist.findByPk(id);
        
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist no encontrada'
            });
        }


        if (playlist.estado === 'eliminada') {
            return res.status(400).json({
                success: false,
                message: 'La playlist ya está eliminada',
                code: 'PLAYLIST_YA_ELIMINADA'
            });
        }

        const fechaActual = new Date();
        const fechaEliminacion = new Date(fecha_eliminacion);
        

        if (fechaEliminacion < fechaActual) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de eliminación no puede ser anterior a la fecha actual',
                code: 'FECHA_ANTERIOR_INVALIDA',
                detalles: {
                    fecha_actual: fechaActual.toISOString(),
                    fecha_proporcionada: fechaEliminacion.toISOString()
                }
            });
        }


        if (isNaN(fechaEliminacion.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de eliminación proporcionada no es válida',
                code: 'FECHA_INVALIDA'
            });
        }


        await playlist.update({
            estado: 'eliminada',
            fecha_eliminacion: fechaEliminacion
        });

        res.json({
            success: true,
            message: 'Playlist eliminada exitosamente',
            data: {
                playlist_id: parseInt(id),
                estado: 'eliminada',
                fecha_eliminacion: fechaEliminacion.toISOString()
            }
        });
    } catch (error) {
        console.error('Error al eliminar playlist:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al eliminar playlist',
            error: error.message
        });
    }
};

module.exports = {
    crearPlaylist,
    agregarCancion,
    quitarCancionDePlaylist,
    eliminarPlaylist
}