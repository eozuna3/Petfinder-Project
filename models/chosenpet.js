/* eslint-disable prettier/prettier */
/* eslint-disable indent */

module.exports = function (sequelize, DataTypes) {
    var ChosenPet = sequelize.define("ChosenPet", {
        petId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        customerId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        petName: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        url: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        petImage: {
            type: DataTypes.STRING(2000),
               allowNull: true
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: true
        }
    });
    return ChosenPet;
};