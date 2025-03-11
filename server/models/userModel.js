
//const User = require('./userModel');
// const Board = require('./boardModel'); // Assuming you have a 'Board' model
module.exports = ( sequelize, DataTypes)=>{
    const userModel = sequelize.define('users', {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },    
      password : {
        type : DataTypes.STRING
      }
    },{
      underscored: true, 
      timestamps: true ,
    }
    );
    return userModel;
    }