module.exports = (sequelize, DataTypes) => {
    const Pais = sequelize.define('Pais', {
        pais_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_pais: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'pais',
        timestamps: false
    });

    return Pais;
};