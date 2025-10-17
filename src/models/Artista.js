module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define('Artista', {
        artista_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_artista: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        imagen: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'artista',
        timestamps: false,
        freezeTableName: true
    });

    return Artista;
};