const { Sequelize, DataTypes, Op } = require('sequelize');
   const sequelize = new Sequelize('fdembgsw_newdata', 'fdembgsw_boycott', 'fdembgsw_boycott', {
host: 'localhost',
     dialect: 'mysql',
     logging: false,
     operationsAliases: false,
      pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000 }},
      {query:{raw:true}},
      );
      const  db={};
      db.userModel =  require('./userModel')(sequelize,DataTypes,Op);
      db.categoryModel =  require('./categoryModel')(sequelize,DataTypes,Op);
      db.brandModel =  require('./brandModel')(sequelize,DataTypes,Op);
      db.productModel =  require('./productModel')(sequelize,DataTypes,Op);
      db.temproductModel =  require('./temproductModel')(sequelize,DataTypes,Op);
      db.blogModel =  require('./blogModel')(sequelize,DataTypes,Op);
      db.blogCategory =  require('./blogCategoryModel')(sequelize,DataTypes,Op);
      db.adsModel =  require('./adsModel')(sequelize,DataTypes,Op);
      db.countryModel =  require('./countryModel')(sequelize,DataTypes,Op);
      db.featureModel =  require('./featureModel')(sequelize,DataTypes,Op);
      db.Sequelize=Sequelize;
      db.sequelize=sequelize;
      Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      try {
        db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      db.sequelize.sync({alter:true})
      .then(() => {
        console.log('Table .... are syncronized');
      })
      .catch((err) => {
        console.error('Error creating table:', err);
      });     
        module.exports = db;  