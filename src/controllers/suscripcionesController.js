const { Suscripcion } = require('../models');

const crearSuscripcion = async(req, res) => {
    try {
        const { usuario_id, tipo_usuario_id, fecha_inicio, fecha_renovacion } = req.body;

        // Validaciones básicas de campos requeridos
        if (!usuario_id || !tipo_usuario_id || !fecha_inicio) {
            return res.status(400).json({
                success: false,
                message: 'Los campos usuario_id, tipo_usuario_id y fecha_inicio son requeridos'
            });
        }

        // Convertir fechas a objetos Date
        const fechaInicio = new Date(fecha_inicio);
        const fechaRenovacion = fecha_renovacion ? new Date(fecha_renovacion) : null;

        // Validar formato de fechas
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

        // Validar que fecha_renovacion sea posterior a fecha_inicio
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

        // Verificar si el usuario ya tiene una suscripción activa
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

        // Crear la suscripción
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
        crearSuscripcion
    };