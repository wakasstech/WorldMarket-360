const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const featureModel = sequelize.define('featured', {
    products:  {
      type: DataTypes.JSON,
      defaultValue: [],     
    },
    brands:{
      type: DataTypes.JSON, 
      defaultValue: [],      
    },
    categories:  {
      type: DataTypes.JSON,  
      defaultValue: [],   
    },
    country: {
      type: DataTypes.STRING,
    },
    feature_title: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('save', 'edit', 'complete'),
      defaultValue: 'save',
    },
    continent: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    timestamps: true, 
  });
  return featureModel;
};
