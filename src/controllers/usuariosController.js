const { where } = require('sequelize');
const { Usuario, Pais, TipoUsuario, Playlist, Suscripcion, DatosPagoUsuario } = require('../models');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
    try {
        const {
            nombre_completo,
            email, 
            password, 
            fecha_nac, 
            sexo, 
            cp, 
            id_pais, 
            tipo_usuario_actual 
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Email y password son obligatorios"
            });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                error: "El email ya está registrado"
            });
        }

        const saltRounds = 10;
        const contraseniaHash = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await Usuario.create({
            nombre_completo: nombre_completo, 
            email: email,
            contrasenia_hash: contraseniaHash,    
            fecha_nacimiento: fecha_nac,          
            sexo: sexo,
            codigo_postal: cp,                    
            pais_id: id_pais,                     
            tipo_usuario_id: tipo_usuario_actual, 
            fecha_registro: new Date()
        });

        const usuarioResponse = { ...nuevoUsuario.toJSON() };
        delete usuarioResponse.contrasenia_hash;

        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            data: usuarioResponse
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error creando usuario",
            details: error.message
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: usuarios } = await Usuario.findAndCountAll({
            where: {
                estado: 'activo'  // ← FILTRO PARA SOLO USUARIOS ACTIVOS
            },
            limit,
            offset,
            order: [['nombre_completo', 'ASC']],
            attributes: { exclude: ['contrasenia_hash'] }
        });

        res.json({
            success: true,
            pagination: {
                page,
                limit,
                total: count,
                pages: Math.ceil(count / limit)
            },
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error obteniendo usuarios",
            details: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findOne({
            where: { 
                usuario_id: id,      
                estado: 'activo'     
            },
            attributes: { 
                exclude: ['contrasenia_hash']
            }
        });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado o eliminado"
            });
        }

        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error obteniendo usuario: " + error.message
        });
    }
}

const updateUserPass = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                error: "El password es requerido"
            });
        }

        const usuario = await Usuario.findOne({
            where: { usuario_id: id }
        });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado"
            });
        }

        const saltRounds = 10;
        const contraseniaHash = await bcrypt.hash(password, saltRounds);

        await usuario.update({
            contrasenia_hash: contraseniaHash,
            fecha_ult_mod_password: new Date() 
        });

        res.json({
            success: true,
            message: "Password actualizado exitosamente"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error actualizando password",
            details: error.message
        });
    }
};

const getUserPasswordVencida = async (req, res) => {
    try {
        const { Op } = require('sequelize');
        
        const fechaLimite = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        
        const todosUsuarios = await Usuario.findAll({
            attributes: ['usuario_id', 'nombre_completo', 'fecha_ult_mod_password'],
            raw: true
        });
        
        todosUsuarios.forEach(user => {
            const dias = user.fecha_ult_mod_password 
                ? Math.floor((Date.now() - new Date(user.fecha_ult_mod_password).getTime()) / (24 * 60 * 60 * 1000))
                : 'Nunca';
        });

        const usuariosVencidos = await Usuario.findAll({
            where: {
                fecha_ult_mod_password: {
                    [Op.lt]: fechaLimite
                }
            },
            attributes: { 
                exclude: ['contrasenia_hash']
            },
            raw: true
        });

        if (usuariosVencidos.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No se encontraron usuarios con password vencida",
                debug: {
                    total_usuarios: todosUsuarios.length,
                    fecha_limite: fechaLimite,
                    usuarios_con_fecha: todosUsuarios.filter(u => u.fecha_ult_mod_password).length
                }
            });
        }

        res.json({
            success: true,
            count: usuariosVencidos.length,
            data: usuariosVencidos
        });

    } catch (error) {
        console.error('❌ Error completo:', error);
        res.status(500).json({
            success: false,
            error: "Error obteniendo usuarios con password vencida",
            details: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado"
            });
        }

        await usuario.update({ estado: 'eliminado' });

        res.status(200).json({
            success: true,
            message: "Usuario marcado como eliminado",
            data: {
                id: usuario.usuario_id,
                nombre: usuario.nombre_completo,
                estado: 'eliminado'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error eliminando usuario: " + error.message
        });
    }
}

const restoreUser = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado"
            });
        }

        await usuario.update({ estado: 'activo' });

        res.status(200).json({
            success: true,
            message: "Usuario restaurado correctamente",
            data: {
                id: usuario.usuario_id,
                nombre: usuario.nombre_completo,
                estado: 'activo'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error restaurando usuario: " + error.message
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserPass,
    getUserPasswordVencida,
    deleteUser,
    restoreUser
}