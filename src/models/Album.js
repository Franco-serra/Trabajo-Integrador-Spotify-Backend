module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
        album_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_album: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        artista_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        discografica_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        imagen_portada: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        anio_lanzamiento: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'album',
        timestamps: false,
        freezeTableName: true
    });

    return Album;
};