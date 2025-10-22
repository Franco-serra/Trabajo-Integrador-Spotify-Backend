module.exports = (sequelize, DataTypes) => {
    const DatosPagoUsuario = sequelize.define('DatosPagoUsuario', {
        datos_pago_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        forma_pago_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cbu: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        banco_codigo: {
            type: DataTypes.STRING(20), 
            allowNull: true
        },
        numero_tarjeta: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        mes_caduca: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        anio_caduca: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cvc: {
            type: DataTypes.STRING(10),
            allowNull: true
        }
    }, {
        tableName: 'datos_pago_usuario',
        timestamps: false,
        freezeTableName: true
    });

    return DatosPagoUsuario;
};