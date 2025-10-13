module.exports = (sequelize, DataTypes) => {
    const FormaPago = sequelize.define('FormaPago', {
        forma_pago_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_forma_pago: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'forma_pago',
        timestamps: false
    });

    return FormaPago;
};