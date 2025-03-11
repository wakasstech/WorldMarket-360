const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports= (sequelize,DataTypes)=>{
    const adsmodel= sequelize.define('ads',{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          image_pid: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          start_date: {
            type: DataTypes.DATE,
            allowNull: true
          },
          end_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
          },
        }, {
            underscored: true,
            timestamp:true
        }
    )
    return adsmodel;
}