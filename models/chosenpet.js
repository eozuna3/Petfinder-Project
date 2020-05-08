module.exports = function (sequelize, DataTypes) {
    var ChosenPet = sequelize.define("chosenpet", {
        petId: { type: DataTypes.INTEGER, allowNull: false },
        customerId: { type: DataTypes.INTEGER, allowNull: false }
    }
    );
    return ChosenPet;
};

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


