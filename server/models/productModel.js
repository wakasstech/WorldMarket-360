
//const User = require('./userModel');
// const Board = require('./boardModel'); // Assuming you have a 'Board' model
module.exports = ( sequelize, DataTypes)=>{
  const productModel = sequelize.define('products', {
    logo: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    brand_logo: {
      type: DataTypes.STRING,
    },
    product_name: {
      type: DataTypes.TEXT,
    },
    product_image: {
      type: DataTypes.TEXT,
    },
    status:{
      type : DataTypes.TEXT
    },
    position : {
      type : DataTypes.TEXT,
    }, 
    description : {
      type : DataTypes.TEXT
    },
    reason :{
      type : DataTypes.TEXT
    },
    bgColor :{
      type : DataTypes.TEXT
    },
    reference : {
      type : DataTypes.TEXT
    },
    feedback :{
      type : DataTypes.TEXT
    },
    category : {
      type : DataTypes.TEXT
    },
    category_name : {
      type : DataTypes.TEXT
    },
    brand_name : {
      type : DataTypes.TEXT
    },
    category_id: {
      type: DataTypes.INTEGER, // Ensure INTEGER type
      allowNull: true,
      references: {
        model: 'categories', 
        key: 'id'
      }},
  
    brand_id : {
      type : DataTypes.TEXT
    },
    // countries: {
    //   type: DataTypes.JSON,  
    //   allowNull: false,
    //   defaultValue: '[]', 
    //   get() {
    //     const rawValue = this.getDataValue('countries');
    //     return JSON.parse(rawValue || '[]');
    //   },
    //   set(value) {
    //     // Ensure the value is stored as a valid JSON object, not a string
    //     if (typeof value === 'string') {
    //       try {
    //         console.log(typeof value)
    //         // If it's already a string, parse it first
    //         const parsedValue = JSON.parse(value);
    //         console.log(parsedValue,"parsedValue")
    //         this.setDataValue('countries', parsedValue);
    //       } catch (e) {
    //         // If parsing fails, log error and save the value directly
    //         console.error('Error parsing JSON value for countries:', e);
    //         this.setDataValue('countries', value);
    //       }
    //     } else {
    //       // If it's already an object, set it directly
    //       this.setDataValue('countries', value);
    //     }
    //   },
    
    // },
    // countries: {
    //   type: DataTypes.JSON,
    //   defaultValue: {},  
    //   get() {
    //     const rawValue = this.getDataValue('countries');
    //     return JSON.parse(rawValue || '{}');
    //   },
    //   set(value) {
    //     // Validate and clean the countries before saving
    //     this.setDataValue('countries', JSON.stringify(cleanCountries(value)));
    //   }
    // }
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
    variant: {
      type: DataTypes.JSON, // Store as JSON array
      defaultValue: [], // Default to an empty array
      get() {
        const rawValue = this.getDataValue('variant');
        return rawValue ? rawValue : [];
      },
      set(value) {
        this.setDataValue('variant', value); // Directly set without JSON.stringify
      },
    },
    brand_id : {
      type : DataTypes.TEXT
    },
     searchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    logo_pid: {
      type: DataTypes.TEXT,
     
    },  imported : {
      type : DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{
    underscored: true, // Use snake_case
    timestamps: true ,  // Enable timestamps
  }
  );
    // Define associations here
   // Define association with Category model
   productModel.associate = models => {
    productModel.belongsTo(models.categoryModel, { 
      foreignKey: 'category_id', 
      as: 'categories',        // Alias for the relationship
    
    });
    };
  return productModel;
  }