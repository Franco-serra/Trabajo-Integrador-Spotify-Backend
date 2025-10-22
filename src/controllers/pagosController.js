const { Pago, Usuario, Suscripcion, DatosPagoUsuario, FormaPago } = require('../models'); // Ajusta la ruta según tu estructura
const { Op } = require('sequelize');

const registrarPago = async (req, res) => {
    try {
        const { id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago } = req.body;


        if (!id_usuario || !id_suscripcion || !id_metodo_pago || !importe || !fecha_pago) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios: id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago'
            });
        }

        if (importe <= 0) {
            return res.status(400).json({
                error: 'El importe debe ser mayor a 0'
            });
        }


        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }


        const suscripcion = await Suscripcion.findByPk(id_suscripcion);
        if (!suscripcion) {
            return res.status(404).json({
                error: 'Suscripción no encontrada'
            });
        }


        const metodoPago = await DatosPagoUsuario.findOne({
            where: {
                datos_pago_id: id_metodo_pago,
                usuario_id: id_usuario
            },
            include: [{
                model: FormaPago,
                required: true
            }]
        });

        if (!metodoPago) {
            return res.status(404).json({
                error: 'Método de pago no encontrado o no pertenece al usuario'
            });
        }


        if (suscripcion.usuario_id !== id_usuario.toString()) {
            return res.status(400).json({
                error: 'La suscripción no pertenece al usuario especificado'
            });
        }


        const nuevoPago = await Pago.create({
            fecha_pago: new Date(fecha_pago),
            importe: importe,
            usuario_id: id_usuario.toString(), 
            forma_pago_id: id_metodo_pago,
            estado: 'completado' 
        });

        await Suscripcion.update(
            { estado: 'activa' },
            { where: { suscripcion_id: id_suscripcion } }
        );

        res.status(201).json({
            message: 'Pago registrado exitosamente',
            pago: {
                pago_id: nuevoPago.pago_id,
                fecha_pago: nuevoPago.fecha_pago,
                importe: nuevoPago.importe,
                usuario_id: nuevoPago.usuario_id,
                forma_pago_id: nuevoPago.forma_pago_id,
                estado: nuevoPago.estado
            }
        });

    } catch (error) {
        console.error('Error al registrar pago:', error);
        res.status(500).json({
            error: 'Error interno del servidor al registrar el pago',
            details: error.message
        });
    }
};

const listarPagos = async (req, res) => {
    try {
        const { usuarioId, desde, hasta } = req.query;

        if (!usuarioId) {
            return res.status(400).json({
                error: 'El parámetro usuarioId es obligatorio'
            });
        }


        const usuarioIdNum = parseInt(usuarioId);
        if (isNaN(usuarioIdNum)) {
            return res.status(400).json({
                error: 'usuarioId debe ser un número válido'
            });
        }


        const usuario = await Usuario.findByPk(usuarioIdNum);
        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }


        const whereConditions = {
            usuario_id: usuarioIdNum.toString()
        };


        if (desde || hasta) {
            whereConditions.fecha_pago = {};
            
            if (desde) {
                const desdeDate = new Date(desde);
                if (isNaN(desdeDate.getTime())) {
                    return res.status(400).json({
                        error: 'Formato de fecha "desde" inválido. Use YYYY-MM-DD'
                    });
                }
                whereConditions.fecha_pago[Op.gte] = desdeDate;
            }
            
            if (hasta) {
                const hastaDate = new Date(hasta);
                if (isNaN(hastaDate.getTime())) {
                    return res.status(400).json({
                        error: 'Formato de fecha "hasta" inválido. Use YYYY-MM-DD'
                    });
                }
                hastaDate.setHours(23, 59, 59, 999);
                whereConditions.fecha_pago[Op.lte] = hastaDate;
            }
        }


        const pagos = await Pago.findAll({
            where: whereConditions,
            include: [
                {
                    model: FormaPago,
                    as: 'FormaPago', 
                    attributes: ['forma_pago_id', 'nombre_forma_pago']
                },
                {
                    model: Usuario,
                    as: 'Usuario', 
                    attributes: ['usuario_id', 'nombre_completo', 'email']
                }
            ],
            order: [['fecha_pago', 'DESC']]
        });


        const pagosFormateados = pagos.map(pago => ({
            pago_id: pago.pago_id,
            fecha_pago: pago.fecha_pago,
            importe: pago.importe,
            estado: pago.estado,
            metodo_pago: pago.FormaPago ? {
                forma_pago_id: pago.FormaPago.forma_pago_id,
                nombre: pago.FormaPago.nombre_forma_pago
            } : null,
            usuario: pago.Usuario ? {
                usuario_id: pago.Usuario.usuario_id,
                nombre: pago.Usuario.nombre_completo,
                email: pago.Usuario.email
            } : null
        }));

        res.status(200).json({
            message: 'Pagos encontrados',
            total: pagos.length,
            pagos: pagosFormateados
        });

    } catch (error) {
        console.error('Error al listar pagos:', error);
        res.status(500).json({
            error: 'Error interno del servidor al obtener los pagos',
            details: error.message
        });
    }
};


module.exports = {
    registrarPago,
    listarPagos
};