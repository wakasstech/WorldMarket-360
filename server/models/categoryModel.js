
module.exports = ( sequelize, DataTypes)=>{
  const categoryModel = sequelize.define('category',{
    name: {
      type: DataTypes.STRING,
    },
    category_description : {
     type : DataTypes.STRING
    },
    category_image: {
      type : DataTypes.STRING
     },
     category_image_pid:{
      type : DataTypes.STRING
     },
     bgColor: {
      type: DataTypes.STRING,
     },
     countries: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [], // Use an array as default
      get() {
        // Get raw value from the database
        const rawValue = this.getDataValue('countries');
        // Parse it as JSON
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        // Directly set value as a JSON object, Sequelize will handle the stringification
        this.setDataValue('countries', (value));
      },
    },
  },{
    underscored: true, 
    timestamps: true ,
  }
  );
// Define associations here
categoryModel.associate = models => {
// One category can have many brands
categoryModel.hasMany(models.brandModel, { foreignKey: 'category_id', as: 'brands',
});
console.log(categoryModel)
// One category can have many products
categoryModel.hasMany(models.productModel, { foreignKey: 'category_id', as: 'products', 

 });
};
  return categoryModel;
  }
