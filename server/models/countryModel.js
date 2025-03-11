module.exports = (sequelize, DataTypes) => {
    const countryModel = sequelize.define('country', {
      country_name: {
        type: DataTypes.STRING,
      },
      country_code: {
        type: DataTypes.STRING,
      },
      country_continent: {
        type: DataTypes.STRING,
      },
      unMember: {
        type: DataTypes.BOOLEAN,
      },
      bgColor: {
        type: DataTypes.STRING,
   
      },
      country_flag:{
        type: DataTypes.STRING,
      }
    }, {
      underscored: true,
      timestamps: true,
    });
    return countryModel;
  };
  