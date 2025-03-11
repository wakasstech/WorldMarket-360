module.exports = (sequelize, DataTypes) => {
    const anprodModel = sequelize.define("anprod", {
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
    });
}

module.exports = anprodModel