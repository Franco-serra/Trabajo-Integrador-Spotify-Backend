module.exports = (sequelize, DataTypes) => {
    const PlaylistCancion = sequelize.define('PlaylistCancion', {
        playlist_cancion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        playlist_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cancion_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha_agregado: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        activa: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        tableName: 'playlist_cancion',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['playlist_id', 'cancion_id']
            }
        ]
    });

    return PlaylistCancion;
};