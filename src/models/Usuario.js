module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_completo: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        sexo: {
            type: DataTypes.ENUM('M', 'F', 'O'),
            allowNull: true
        },
        codigo_postal: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        pais_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipo_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        contrasenia_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'usuario',
        timestamps: false
    });

    return Usuario;
};