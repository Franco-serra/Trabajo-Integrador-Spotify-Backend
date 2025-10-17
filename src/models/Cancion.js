module.exports = (sequelize, DataTypes) => {
    const Cancion = sequelize.define('Cancion', {
        cancion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_cancion: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        duracion_min: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        reproducciones: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'cancion',
        timestamps: false,
        freezeTableName: true
    });

    return Cancion;
};