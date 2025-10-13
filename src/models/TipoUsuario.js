module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define('TipoUsuario', {
        tipo_usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'tipo_usuario',
        timestamps: false
    });

    return TipoUsuario;
};