module.exports = (sequelize, DataTypes) => {
    const Pago = sequelize.define('Pago', {
        pago_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_pago: {
            type: DataTypes.DATE,
            allowNull: false
        },
        importe: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        forma_pago_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('completado', 'pendiente', 'fallido'),
            allowNull: false,
            defaultValue: 'completado'
        }
    }, {
        tableName: 'pago',
        timestamps: false
    });

    return Pago;
};