module.exports = function (sequelize, DataTypes) {
    var ChosenPet = sequelize.define("ChosenPet", {
        petId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        customerId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        }
/*        petName: {
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
        }*/
    });
    // ChosenPet.associate = function (models) {
    //     // We're saying that a Burger should belong to an Author
    //     // A Burger can't be created without an Author due to the foreign key constraint
    //     models.ChosenPets.belongsTo(models.Customer, {
    //         foreignKey: {
    //             name: customerId,
    //             allowNull: false
    //         },
    //         targetKey: "id"
    //     });
    // };
    return ChosenPet;
};



