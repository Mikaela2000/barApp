const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Bar = sequelize.define(
        "Bar",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ubicacion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fuente: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            scraped_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        { 
            timestamps: true,
            freezeTableName: true 
        }
    );

  
    Bar.addHook('afterUpdate', async (bar, options) => {
        try {
          
            const { BarHistory } = bar.sequelize.models;
            
            if (BarHistory) {
                await BarHistory.create({
                    barId: bar.id,
                    accion: 'UPDATE',
                    cambios: {
                        antes: bar._previousDataValues,
                        despues: bar.dataValues
                    },
                    fecha: new Date()
                });
                console.log(`Historial registrado para el bar: ${bar.nombre}`);
            }
        } catch (error) {
            console.error("Error en el Hook de Historial:", error.message);
        }
    });
};