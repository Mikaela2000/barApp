const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "BarHistory",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            barId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            accion: {
                type: DataTypes.STRING, 
                allowNull: false,
            },
            cambios: {
                type: DataTypes.JSONB, 
                allowNull: true,
            },
            fecha: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        { 
            timestamps: false,
            freezeTableName: true 
        }
    );
};