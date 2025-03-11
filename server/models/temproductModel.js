
//const User = require('./userModel');
// const Board = require('./boardModel'); // Assuming you have a 'Board' model
module.exports = ( sequelize, DataTypes)=>{
    const Temproduct = sequelize.define('temproducts', {
      logo: {
        type: DataTypes.STRING,
      },
      brand_name: {
        type: DataTypes.STRING,
      },
      product_name: {
        type: DataTypes.TEXT,
      },
      status : {
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
      
      category_id : {
        type : DataTypes.TEXT
      },
      brand_id : {
        type : DataTypes.TEXT
      }
      , searchCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      logo_pid: {
        type: DataTypes.TEXT,
        defaultValue: 0,
      },  imported : {
        type : DataTypes.BOOLEAN,
        defaultValue: false,
      },
      
    },{
      underscored: true, // Use snake_case
      timestamps: true ,  // Enable timestamps
    }
    );
    return Temproduct;
    }