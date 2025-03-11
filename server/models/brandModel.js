const { brandModel } = require(".");
module.exports = ( sequelize, DataTypes)=>{
    const brandModel = sequelize.define('brand',{
      name: {
        type: DataTypes.STRING,
      },    
      brand_description : {
       type : DataTypes.STRING
      },
      brand_image : {
        type : DataTypes.STRING
       },
       brand_image_pid : {
        type : DataTypes.STRING
       },
       category_id: {
        type: DataTypes.INTEGER, // Ensure INTEGER type
        allowNull: true,
        references: {
          model: 'categories', // This should match the actual table name in your database
          key: 'id'
        }},
       category_name:{
        type:DataTypes.STRING
       },
       country_name: {
        type: DataTypes.STRING,
      },
      bgColor: {
        type: DataTypes.STRING,
      },
      // countries: {
      //   type: DataTypes.STRING,
      // },
      // country_continent: {
      //   type: DataTypes.STRING,
      // },
      countries: {
        type: DataTypes.JSON,
       
        // Use an array as default
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
    //    // Define associations here
    brandModel.associate = models => {
      brandModel.belongsTo(models.categoryModel, {
        foreignKey: 'category_id',
        as: 'categories',
       
      });
  };
    return brandModel;
    }