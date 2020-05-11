/* eslint-disable prettier/prettier */
/* eslint-disable indent */
module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        // zipcode: DataTypes.INTEGER,
    });

    // Customer.associate = function (models) {
    //     // We're saying that a chosenPet should belong to Customer
    //     Customer.hasMany(ChosenPet, {
    //         as: "ChosenPet"
    //         // foreignKey: "userId",
    //         // sourceKey: "userId",
    //         // onDelete: "cascade"
    //     });
    // };
    return Customer;
};
