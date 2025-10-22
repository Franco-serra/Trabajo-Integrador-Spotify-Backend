const { DatosPagoUsuario, FormaPago } = require('../models'); 

const crearMetodoPago = async (req, res) => {
    try {
        const {
            usuario_id,
            tipo_forma_pago,
            numero_tarjeta,
            mes_caduca,
            anio_caduca,
            banco_codigo
        } = req.body;

        if (!usuario_id || !tipo_forma_pago || !numero_tarjeta) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios: usuario_id, tipo_forma_pago, numero_tarjeta'
            });
        }


        let formaPago = await FormaPago.findOne({
            where: { nombre_forma_pago: tipo_forma_pago }
        });

        if (!formaPago) {
            formaPago = await FormaPago.create({
                nombre_forma_pago: tipo_forma_pago
            });
        }

        const numeroTarjetaEnmascarado = `**** **** **** ${numero_tarjeta.slice(-4)}`;

        const metodoPagoExistente = await DatosPagoUsuario.findOne({
            where: {
                usuario_id: usuario_id,
                forma_pago_id: formaPago.forma_pago_id,
                numero_tarjeta: numeroTarjetaEnmascarado
            }
        });

        if (metodoPagoExistente) {
            return res.status(409).json({
                error: 'El usuario ya tiene registrado este método de pago',
                detalles: 'No se puede registrar la misma tarjeta múltiples veces'
            });
        }

        const ultimosCuatroDigitos = numero_tarjeta.slice(-4);
        const metodoPagoSimilar = await DatosPagoUsuario.findOne({
            where: {
                usuario_id: usuario_id,
                forma_pago_id: formaPago.forma_pago_id
            }
        });

        if (metodoPagoSimilar) {
            
            const ultimosExistentes = metodoPagoSimilar.numero_tarjeta.slice(-4);
            if (ultimosExistentes === ultimosCuatroDigitos) {
                return res.status(409).json({
                    error: 'El usuario ya tiene una tarjeta con estos últimos 4 dígitos registrada',
                    detalles: 'No se puede registrar la misma tarjeta múltiples veces'
                });
            }
        }

        const nuevoMetodoPago = await DatosPagoUsuario.create({
            usuario_id: usuario_id,
            forma_pago_id: formaPago.forma_pago_id,
            numero_tarjeta: numeroTarjetaEnmascarado,
            mes_caduca: mes_caduca,
            anio_caduca: anio_caduca,
            banco_codigo: banco_codigo,
            cvc: null 
        });

        return res.status(201).json({
            mensaje: 'Método de pago creado exitosamente',
            datos_pago: {
                datos_pago_id: nuevoMetodoPago.datos_pago_id,
                usuario_id: nuevoMetodoPago.usuario_id,
                forma_pago_id: nuevoMetodoPago.forma_pago_id,
                numero_tarjeta: nuevoMetodoPago.numero_tarjeta, 
                mes_caduca: nuevoMetodoPago.mes_caduca,
                anio_caduca: nuevoMetodoPago.anio_caduca,
                banco_codigo: nuevoMetodoPago.banco_codigo
            }
        });

    } catch (error) {
        console.error('Error al crear método de pago:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            detalle: error.message
        });
    }
};

const listarMetodosPago = async (req, res) => {
    try {
        const { usuarioId } = req.query;

        // Validar que se proporcionó el usuarioId
        if (!usuarioId) {
            return res.status(400).json({
                error: 'El parámetro usuarioId es obligatorio'
            });
        }

        // Validar que usuarioId es un número válido
        const usuarioIdNum = parseInt(usuarioId);
        if (isNaN(usuarioIdNum)) {
            return res.status(400).json({
                error: 'El usuarioId debe ser un número válido'
            });
        }

        // Buscar métodos de pago del usuario
        const metodosPago = await DatosPagoUsuario.findAll({
            where: {
                usuario_id: usuarioIdNum
            },
            include: [{
                model: FormaPago,
                attributes: ['forma_pago_id', 'nombre_forma_pago']
            }],
            attributes: [
                'datos_pago_id',
                'usuario_id',
                'numero_tarjeta',
                'mes_caduca',
                'anio_caduca',
                'banco_codigo',
                'cbu'
            ],
            order: [['datos_pago_id', 'DESC']] // Ordenar por el más reciente primero
        });

        // Formatear la respuesta
        const metodosFormateados = metodosPago.map(metodo => ({
            datos_pago_id: metodo.datos_pago_id,
            usuario_id: metodo.usuario_id,
            tipo_forma_pago: metodo.FormaPago ? metodo.FormaPago.nombre_forma_pago : 'Desconocido',
            numero_tarjeta: metodo.numero_tarjeta,
            fecha_caducidad: metodo.mes_caduca && metodo.anio_caduca 
                ? `${metodo.mes_caduca.toString().padStart(2, '0')}/${metodo.anio_caduca}`
                : null,
            banco_codigo: metodo.banco_codigo,
            cbu: metodo.cbu
        }));

        return res.status(200).json({
            mensaje: `Métodos de pago encontrados: ${metodosFormateados.length}`,
            datos_pago: metodosFormateados
        });

    } catch (error) {
        console.error('Error al listar métodos de pago:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            detalle: error.message
        });
    }
};

module.exports = {
    crearMetodoPago,
    listarMetodosPago
};