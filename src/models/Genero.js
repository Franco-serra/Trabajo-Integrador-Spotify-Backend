module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {
        genero_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_genero: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'genero',
        timestamps: false,
        freezeTableName: true
    });

    return Genero;
};