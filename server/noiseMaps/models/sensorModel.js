"use strict";

module.exports = function(sequelize, DataTypes) {

    var Sensor = sequelize.define("sensor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coords: DataTypes.STRING,
        identificator: DataTypes.INTEGER,
        noiseLvl: DataTypes.INTEGER,

    }, {
        timestamps: false
    });
    // Sensor.sync();
    return Sensor;
};
