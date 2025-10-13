module.exports = (sequelize, DataTypes) => {
    const Suscripcion = sequelize.define('Suscripcion', {
        suscripcion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_renovacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        usuario_id: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        tipo_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('activa', 'cancelada', 'expirada'),
            allowNull: false,
            defaultValue: 'activa'
        }
    }, {
        tableName: 'suscripcion',
        timestamps: false
    });

    return Suscripcion;
};