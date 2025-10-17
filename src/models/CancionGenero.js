module.exports = (sequelize, DataTypes) => {
    const CancionGenero = sequelize.define('CancionGenero', {
        cancion_genero_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cancion_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        genero_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'cancion_genero',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['cancion_id', 'genero_id']
            }
        ]
    });

    return CancionGenero;
};