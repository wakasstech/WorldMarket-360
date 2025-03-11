module.exports = ( sequelize, DataTypes)=>{
    const blogModel = sequelize.define('blog', {
        title: {
            type: DataTypes.STRING,
          },
          slug: {
            type: DataTypes.STRING,
          },
          content: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.TEXT,   
          },
          image: {
            type: DataTypes.STRING,
           
          },
          image_pid: {
            type: DataTypes.STRING,
          },
          // tags: {
          //   type: DataTypes.TEXT, 
          //   defaultValue: '[]', 
          //   get() {
           
          //     const rawValue = this.getDataValue('tags');
          //     return JSON.parse(rawValue || '[]');
          //   },
          //   set(value) {
             
          //     this.setDataValue('tags', JSON.stringify(value));
          //   },
          // },
          tags: {
            type: DataTypes.TEXT, 
            defaultValue: '[]', 
            get() {
              const rawValue = this.getDataValue('tags');
              try {
                return JSON.parse(rawValue || '[]');
              } catch (error) {
                return [];  // Fallback to an empty array if parsing fails
              }
            },
            set(value) {
              // Ensure that value is an array
              if (Array.isArray(value)) {
                // Safely stringify the array
                this.setDataValue('tags', JSON.stringify(value));
              } else {
                throw new Error('Tags must be an array');
              }
            }
          },
          
          author: {
            type: DataTypes.STRING,
           
          },
          category: {
            type: DataTypes.STRING,
           
          },
          brand: {
            type: DataTypes.STRING,
           
          },
          sections: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          sidebarSections: {
            type: DataTypes.JSON,
            
          },
          isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          like: {
            type: DataTypes.INTEGER,
            defaultValue: 0, 
          },
          ReadTime: {
            type: DataTypes.STRING,
            defaultValue: 0, 
          },
        })

    return blogModel;
    }