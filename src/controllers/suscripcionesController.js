const { Suscripcion, Usuario, TipoUsuario} = require('../models');


const obtenerSuscripcionPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: 'El parámetro id es obligatorio'
            });
        }

        const suscripcionId = parseInt(id);
        if (isNaN(suscripcionId)) {
            return res.status(400).json({
                error: 'El id debe ser un número válido'
            });
        }

        const suscripcion = await Suscripcion.findByPk(suscripcionId);

        if (!suscripcion) {
            return res.status(404).json({
                error: 'Suscripción no encontrada'
            });
        }


        const [usuario, tipoUsuario] = await Promise.all([
            Usuario.findByPk(suscripcion.usuario_id),
            TipoUsuario.findByPk(suscripcion.tipo_usuario_id)
        ]);


        const suscripcionFormateada = {
            suscripcion_id: suscripcion.suscripcion_id,
            fecha_inicio: suscripcion.fecha_inicio,
            fecha_renovacion: suscripcion.fecha_renovacion,
            fecha_fin: suscripcion.fecha_fin,
            estado: suscripcion.estado,
            usuario: usuario ? {
                usuario_id: usuario.usuario_id,
                nombre_completo: usuario.nombre_completo,
                email: usuario.email,
                estado: usuario.estado
            } : null,
            tipo_usuario: tipoUsuario ? {
                tipo_usuario_id: tipoUsuario.tipo_usuario_id,
                nombre_tipo: tipoUsuario.nombre_tipo 
            } : null
        };

        res.status(200).json({
            message: 'Suscripción encontrada',
            suscripcion: suscripcionFormateada
        });

    } catch (error) {
        console.error('Error al obtener suscripción:', error);
        res.status(500).json({
            error: 'Error interno del servidor al obtener la suscripción',
            details: error.message
        });
    }
};


const crearSuscripcion = async(req, res) => {
    try {
        const { usuario_id, tipo_usuario_id, fecha_inicio, fecha_renovacion } = req.body;


        if (!usuario_id || !tipo_usuario_id || !fecha_inicio) {
            return res.status(400).json({
                success: false,
                message: 'Los campos usuario_id, tipo_usuario_id y fecha_inicio son requeridos'
            });
        }


        const fechaInicio = new Date(fecha_inicio);
        const fechaRenovacion = fecha_renovacion ? new Date(fecha_renovacion) : null;


        if (isNaN(fechaInicio.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'El formato de fecha_inicio no es válido',
                code: 'FECHA_INICIO_INVALIDA'
            });
        }

        if (fechaRenovacion && isNaN(fechaRenovacion.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'El formato de fecha_renovacion no es válido',
                code: 'FECHA_RENOVACION_INVALIDA'
            });
        }


        if (fechaRenovacion && fechaRenovacion <= fechaInicio) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de renovación debe ser posterior a la fecha de inicio',
                code: 'FECHA_RENOVACION_ANTERIOR',
                detalles: {
                    fecha_inicio: fechaInicio.toISOString(),
                    fecha_renovacion_proporcionada: fechaRenovacion.toISOString()
                }
            });
        }


        const suscripcionExistente = await Suscripcion.findOne({
            where: {
                usuario_id,
                estado: 'activa'
            }
        });

        if (suscripcionExistente) {
            return res.status(409).json({
                success: false,
                message: 'El usuario ya tiene una suscripción activa',
                data: suscripcionExistente
            });
        }


        const nuevaSuscripcion = await Suscripcion.create({
            usuario_id,
            tipo_usuario_id,
            fecha_inicio: fechaInicio,
            fecha_renovacion: fechaRenovacion,
            estado: 'activa'
        });

        res.status(201).json({
            success: true,
            message: 'Suscripción creada exitosamente',
            data: nuevaSuscripcion
        });
    } catch (error) {
        console.error('Error al crear suscripción:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al crear suscripción',
            error: error.message
        });
    }
};

    module.exports = {
        crearSuscripcion,
        obtenerSuscripcionPorId
    };