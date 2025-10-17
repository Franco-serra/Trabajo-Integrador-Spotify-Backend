module.exports = (sequelize, DataTypes) => {
    const Discografica = sequelize.define('Discografica', {
        discografica_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_discografica: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pais_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'discografica',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['nombre_discografica', 'pais_id']
            }
        ]
    });

    return Discografica;
};