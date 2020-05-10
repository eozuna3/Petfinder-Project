/* eslint-disable prettier/prettier */
/* eslint-disable indent */
module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING
    });

    //add to master
    // Customer.associate = function (models) {
    //     // We're saying that a chosenPet should belong to Customer
    //     Customer.hasMany(ChosenPet, {
    //         as: "chosenPet"
    //         // foreignKey: "userId",
    //         // sourceKey: "userId",
    //         // onDelete: "cascade"
    //     });
    // };
    return Customer;
};
