
module.exports = (sequelize, DataTypes) => {
    const BlogCategoryModel = sequelize.define('BlogCategory', {
      name: {
        type: DataTypes.STRING,
       
      },
      description: {
        type: DataTypes.TEXT,
      }
    }, {
      timestamps: true, 
    });
    return BlogCategoryModel;
  };
  