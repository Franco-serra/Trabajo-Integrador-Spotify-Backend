module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define('Playlist', {
        playlist_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_playlist: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cantidad_canciones: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        usuario_id: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('activa', 'eliminada'),
            allowNull: false,
            defaultValue: 'activa'
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'playlist',
        timestamps: false,
        freezeTableName: true
    });

    return Playlist;
};