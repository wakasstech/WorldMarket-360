//const { image } = require("pdfkit/js/mixins/images");
const db = require("../models/index.js");
 const { uploadOnCloudinary, deleteOnCloudinary } = require('../utils/cloudinary.js');
 const {Sequelize, Op } = require("sequelize");
const blogModel = db.blogModel;
const brandModel = db.brandModel;
const fs = require("fs");
const createBlog = async (req, res) => {
  try {
    // Access form fields from req.body
    const { title, description, tags:tagsJSON, sections: sectionsJSON,sidebarSections: sidebarSectionsJSON, brand, category } = req.body;
    // Parse sections from JSON if it's sent as a string
    const sections = JSON.parse(sectionsJSON);   
    const sidebarSections = JSON.parse(sidebarSectionsJSON);
    const tags=JSON.parse(tagsJSON);
let image;
let image_pid;
    // Initialize an array to store image URLs and public IDspost
    let images = [];
    // Process each uploaded file
    // for (const file of req.files) {
    //   const cloudinary_res = await uploadOnCloudinary(file.path);
    //   images.push({
    //     url: cloudinary_res.url,
    //     public_id: cloudinary_res.public_id,
    //     field: file.fieldname,
    //   });
    for (const file of req.files) {
      const cloudinary_res = await uploadOnCloudinary(file.path);
      const imgData = {
        url: cloudinary_res.url,
        public_id: cloudinary_res.public_id,
        field: file.fieldname,
      };
      images.push(imgData);
      // Store URL and public ID if field matches 'image'
      if (file.fieldname === 'image') {
        image = imgData.url;
        image_pid = imgData.public_id;
      }
      // Remove the file from the local filesystem
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting file from local system:', err);
        } else {
          console.log('File deleted from local system');
        }
      });
    }
    // Log the sections and images for debugging
    console.log(sections, 'Sections');
    console.log(images, 'Uploaded Images');

    // Replace the uids with Cloudinary URLs in the sections
    sections.forEach((section, sectionIndex) => {
      if (section.type === 'images') {
        section.content = section.content.map((imageContent, contentIndex) => {
          // Find the corresponding image in the images array
          const matchingImage = images.find(
            (img) => img.field === `sections[${sectionIndex}].content[${contentIndex}]`
          );
          return matchingImage ? matchingImage.url : imageContent.uid; // Replace uid with the URL
        });
      }
    });

    console.log(sections, 'Updated Sections with URLs');
    // Now you can proceed to save the blog entry to the database with the updated sections
    // For example:
    const newBlog = await blogModel.create({
      title,
      description,
      tags,
      sections,
      brand,
      image,
      image_pid,
      category,
    
    sections,
    sidebarSections
    });
    res.status(200).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
};
  const getBlogs = async (req, res) => {
    const { page = 1, limit = 1000 } = req.query;
    try {
      const offset = (page - 1) * limit;
      const blogs = await blogModel.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [
          ['id', 'DESC'], // Adjust the order if needed
        ],
      });
      res.status(200).json({
        totalItems: blogs.count,
        totalPages: Math.ceil(blogs.count / limit),
        currentPage: parseInt(page),
        result: blogs.rows
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// const getBlogById = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const blog = await blogModel.findByPk(id);
//     if (!blog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// const getBlogById = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const blog = await blogModel.findByPk(id);
//     if (!blog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
     
  
//   const ids = blog.sidebarSections.filter(section => section.type === "similarBlog")
//       .map(section => section.content.id);
  
//   console.log("ids",ids);
//     // blogsidebarSectionIds=blog.siderbarSectionIds
//     const similarBlog=await //make the querry which get simialr blog  but  thses ids shlould be excluded form the list of similar blog
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


//my_previous
// const getBlogById = async (req, res) => {
//   try {
//     const { id } = req.query;
//     // Find the blog by primary key
//     const blog = await blogModel.findByPk(id);
//     if (!blog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
//     // Extract the IDs of the sidebar sections with type "similarBlog"
//     // const ids = blog.sidebarSections
//     //   .filter(section => section.type === "similarBlog")
//     //   .map(section => section.content.id);
//     const ids = blog.sidebarSections !== null ?  blog.sidebarSections
//       .filter(section => section.type === "similarBlog")
//       .map(section => section.content.id) : [];
//     console.log("ids", ids);
//     // Query to find similar blogs, excluding the blogs with the IDs in 'ids'
//     const similarBlogs = await blogModel.findAll({
//       where: {
//         // Define logic to find blogs similar to the current blog (adjust according to your criteria)
//          brand: blog.brand ,// Example condition for similarity

//         // Exclude the blogs with the IDs in 'ids'
//         id: {
//           [Op.notIn]: ids
//         }
//       },
//     });
//     // Query to find the blogs that were excluded by 'ids'
//     const excludedBlogs = await blogModel.findAll({
//       where: {
//         id: {
//           [Op.in]: ids,
//         },
//       },
//     });
//     //  // Extract tags from similar blogs and excluded blogs
//     //  const getTagsFromBlogs = (blogs) =>
//     //   blogs
//     //     .flatMap((blog) => blog.tags)
//     //     .filter((tag) => tag); 
//     const getTagsFromBlogs = (blogs) => {
    
//       // Helper function to clean up tags by removing slashes and quotes
//       const cleanTag = (tag) => tag ? tag.replace(/^\/+|\/+$/g, '').replace(/^"+|"+$/g, '') : '';
  
//       return blogs
//         .flatMap((blog) => blog.tags)
//         .map(cleanTag) // Clean each tag
//         .filter((tag) => tag ); // Filter out excluded tags
//     };
    





//     const similarBlogTags = getTagsFromBlogs(similarBlogs);
//     const excludedBlogTags = getTagsFromBlogs(excludedBlogs);
//     console.log('Similar Blog Tags:', similarBlogTags); // Output cleaned and filtered tags
// console.log('Excluded Blog Tags:', excludedBlogTags);
// console.log("ful list",[...similarBlogTags,...excludedBlogTags])
  
//     const distinctTags = Array.from(
//       new Set([...similarBlogTags, ...excludedBlogTags])
//     );

//     res.status(200).json({ blog, similarBlogs, distinctTags});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getBlogById = async (req, res) => {
  try {
    const { id } = req.query;

    // Find the blog by primary key
    const blog = await blogModel.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Fetch the brand details separately using the brand name from the blog
    const brand = await brandModel.findOne({
      where: {
        name: blog.brand,
      },
      attributes: ['name', 'country_name','country_continent'], // Only select the name and country_name fields
    });

    // Extract the country name from the brand
    const countryName = brand ? brand.country_name : null;
    const continentName = brand ? brand.country_continent : null;
    // Extract the IDs of the sidebar sections with type "similarBlog"
    const ids = blog.sidebarSections !== null ? blog.sidebarSections
      .filter(section => section.type === "similarBlog")
      .map(section => section.content.id) : [];

    console.log("ids", ids);

    // Query to find similar blogs, excluding the blogs with the IDs in 'ids'
    const similarBlogs = await blogModel.findAll({
      where: {
        brand: blog.brand, // Example condition for similarity

        // Exclude the blogs with the IDs in 'ids'
        id: {
          [Op.notIn]: ids,
        },
      },
    });

    // Query to find the blogs that were excluded by 'ids'
    const excludedBlogs = await blogModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    // Extract tags from similar blogs and excluded blogs
    const getTagsFromBlogs = (blogs) => {
      // Helper function to clean up tags by removing slashes and quotes
      const cleanTag = (tag) => tag ? tag.replace(/^\/+|\/+$/g, '').replace(/^"+|"+$/g, '') : '';

      return blogs
        .flatMap((blog) => blog.tags)
        .map(cleanTag) // Clean each tag
        .filter((tag) => tag); // Filter out excluded tags
    };

    const similarBlogTags = getTagsFromBlogs(similarBlogs);
    const excludedBlogTags = getTagsFromBlogs(excludedBlogs);
    console.log('Similar Blog Tags:', similarBlogTags); // Output cleaned and filtered tags
    console.log('Excluded Blog Tags:', excludedBlogTags);
    console.log("Full list", [...similarBlogTags, ...excludedBlogTags]);

    const distinctTags = Array.from(
      new Set([...similarBlogTags, ...excludedBlogTags])
    );

    res.status(200).json({ blog, similarBlogs, distinctTags, countryName ,continentName});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogsByBrand = async (req, res) => {
  const { page = 1, limit = 1000, brand } = req.query; // Get brand from query parameters
  if (!brand) {
    return res.status(400).json({ error: 'Brand parameter is required' });
  }
  try {
    const offset = (page - 1) * limit;
    const blogs = await blogModel.findAndCountAll({
      where: { brand: brand }, // Filter by brand
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['id', 'DESC'], // Adjust the order if needed
      ],
    });

    res.status(200).json({
      totalItems: blogs.count,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: parseInt(page),
      result: blogs.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBlogsByCountry = async (req, res) => {
  const { page = 1, limit = 1000, country } = req.query;
  if (!country) {
    return res.status(400).json({ error: 'Country parameter is required' });
  }
  const getBrandsByCountry = async (country) => {
    return await brandModel.findAll({
      where: { country_name: country }
    });
  };
  try {
    const offset = (page - 1) * limit;
    const brands = await getBrandsByCountry(country);
    
    if (brands.length === 0) {
      return res.status(404).json( 'No brands found for the specified country' );
    }
    const brand_names = brands.map(brand => brand.name);
    console.log(brand_names,"brands_name")
    // Step 2: Get blogs by brand IDs
    const blogs = await blogModel.findAndCountAll({
      where: { brand: brand_names },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['id', 'DESC']
      ]
    });
    res.status(200).json({
      totalItems: blogs.count,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: parseInt(page),
      result: blogs.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBlogsByCategory = async (req, res) => {
  const { page = 1, limit = 1000, category } = req.query; // Get category from query parameters
  if (!category) {
    return res.status(400).json({ error: 'Category parameter is required' });
  }
  try {
    const offset = (page - 1) * limit;
    const blogs = await blogModel.findAndCountAll({
      where: { category: category }, // Filter by category
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['id', 'DESC'], // Adjust the order if needed
      ],
    });

    res.status(200).json({
      totalItems: blogs.count,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: parseInt(page),
      result: blogs.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const updateBlog = async (req, res) => {
//   try {
//     // Access form fields from req.body
//     const { id, title, description, tags, sections: sectionsJSON, brand, category, author } = req.body;
//     const sections = JSON.parse(sectionsJSON);
    
//     let image;
//     let image_pid;
//     let images = [];
//     let imagePublicIds = [];

//     // Get the existing blog entry from the database
//     const existingBlog = await blogModel.findByPk(id);
//     if (!existingBlog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     // Collect old image public IDs for deletion
//     if (existingBlog.image_pid) {
//       imagePublicIds.push(existingBlog.image_pid);
//     }

//     // Process each uploaded file
//     for (const file of req.files) {
//       const cloudinary_res = await uploadOnCloudinary(file.path);
//       const imgData = {
//         url: cloudinary_res.url,
//         public_id: cloudinary_res.public_id,
//         field: file.fieldname,
//       };
//       images.push(imgData);

//       if (file.fieldname === 'image') {
//         image = imgData.url;
//         image_pid = imgData.public_id;
//       }

//       fs.unlink(file.path, (err) => {
//         if (err) {
//           console.error('Error deleting file from local system:', err);
//         } else {
//           console.log('File deleted from local system');
//         }
//       });
//     }

//     // // Delete old images from Cloudinary
//     // for (const public_id of imagePublicIds) {
//     //   await deleteOnCloudinary(public_id);
//     // }
//      sections.forEach((section, sectionIndex) => {
//       if (section.type === 'images') {
//         section.content = section.content.map((imageContent, contentIndex) => {
//           const matchingImage = images.find(
//             (img) => img.field === `sections[${sectionIndex}].content[${contentIndex}]`
//           );
//           return matchingImage ? matchingImage.url : imageContent.uid; // Replace uid with the URL
//         });
//       } else if (section.type === 'text') {
       
//         section.content = req.body.sections[sectionIndex].content || section.content;
//       }
//     });
//     console.log(sections, 'Updated Sections with URLs');


//     // Update the blog entry in the database
//     const updatedBlog= await existingBlog.update({
//       title: title || existingBlog.title,
//       description: description || existingBlog.description,
//       tags: tags || existingBlog.tags,
//       sections,
//       brand: brand || existingBlog.brand,
//       image: image || existingBlog.image,
//       image_pid: image_pid || existingBlog.image_pid,
//       category: category || existingBlog.category,
//       author: author || existingBlog.author,
//     });

//     res.status(200).json({ message: 'Blog updated successfully' ,updatedBlog});
//   } catch (error) {
//     console.error('Error updating blog:', error);
//     res.status(500).json({ message: 'Failed to update blog' });
//   }
// };
const updateBlog = async (req, res) => {
  try {
    // Access form fields from req.body
    const { id, title, description, tags, sections: sectionsJSON, sidebarSections: sidebarSectionsJSON, brand, category, author } = req.body;
    // Parse sections into JSON
    const sections = JSON.parse(sectionsJSON);
    const sidebarSections = JSON.parse(sidebarSectionsJSON);
    console.log("After parsing",sidebarSections)
    let image;
    let image_pid;
    let images = [];
    let imagePublicIds = [];

    // Get the existing blog entry from the database
    const existingBlog = await blogModel.findByPk(id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Collect old image public IDs for deletion
    if (existingBlog.image_pid) {
      imagePublicIds.push(existingBlog.image_pid);
    }

    // Process each uploaded file
    for (const file of req.files) {
      const cloudinary_res = await uploadOnCloudinary(file.path);
      const imgData = {
        url: cloudinary_res.url,
        public_id: cloudinary_res.public_id,
        field: file.fieldname,
      };
      images.push(imgData);

      if (file.fieldname === 'image') {
        image = imgData.url;
        image_pid = imgData.public_id;
      }

      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting file from local system:', err);
        } else {
          console.log('File deleted from local system');
        }
      });
    }

    // // Update the sections, replacing image UIDs with Cloudinary URLs and handling text content
    // sections.forEach((section, sectionIndex) => {
    //   if (section.type === 'images') {
    //     section.content = section.content.map((imageContent, contentIndex) => {
    //       const matchingImage = images.find(
    //         (img) => img.field === `sections[${sectionIndex}].content[${contentIndex}]`
    //       );
    //       return matchingImage ? matchingImage.url : imageContent.uid; // Replace uid with the URL
    //     });
    //   } else if (section.type === 'text') {
    //     // Update text content directly
    //     section.content = req.body.sections[sectionIndex].content || section.content;
    //   }
    // });
    // Update the sections, replacing image UIDs with Cloudinary URLs and handling text content
sections.forEach((section, sectionIndex) => {
  if (section.type === 'images'){
    section.content = section.content.map((imageContent, contentIndex) => {
      // Check if the current content is a Cloudinary URL (i.e., it already has a URL)
      const isExistingCloudinaryUrl = typeof imageContent === 'string' && imageContent.startsWith('http');
      console.log('isExistingCloudinaryUrl',isExistingCloudinaryUrl)
      // Find if a new image was uploaded for this index
      const matchingImage = images.find(
        (img) => img.field === `sections[${sectionIndex}].content[${contentIndex}]`
      );

      // Update only if a new image was uploaded; otherwise, keep the existing URL
      if (matchingImage) {
        return matchingImage.url;
      } else if (isExistingCloudinaryUrl) {
        return imageContent; // Keep the existing URL if it's already a Cloudinary URL
      } else {
        return imageContent.uid; // Return the UID if no matching image or existing Cloudinary URL
      }
    });
  } else if (section.type === 'text') {
    // Update text content directly
    section.content = req.body.sections[sectionIndex].content || section.content;
  }
});


    // Log the updated sections for debugging
    console.log(sections, 'Updated Sections with URLs and Text Content');


    
    let Artags = JSON.parse(tags);
    console.log(Artags);  // This should now be an array: ["tag1", "tag2", "tag3 update"]
    console.log("typeof(Artags)", typeof(Artags));

    // Update the blog entry in the database
    const updatedBlog = await existingBlog.update({
      title: title || existingBlog.title,
      description: description || existingBlog.description,
      tags: Artags || existingBlog.tags,
      sections: sections || existingBlog.sections,
      sidebarSections:sidebarSections || existingBlog.sidebarSections,
      brand: brand || existingBlog.brand,
      image: image || existingBlog.image,
      image_pid: image_pid || existingBlog.image_pid,
      category: category || existingBlog.category,
      author: author || existingBlog.author,
    });
    console.log("tag............",updatedBlog)

    // Respond with the updated blog details
    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog' });
  }
};
const getblogsByTags = async (req, res) => {
  try {
    // Get the tag from the request params
    const tag = req.query.tag;
console.log("tag",tag)
  // Query blogs where the 'tags' string contains the specified tag
  const blogs = await blogModel.findAll({
    where: Sequelize.literal(`JSON_CONTAINS(tags, '"${tag}"')`), // Checks if the tag exists in the JSON array
  });
    console.log("blogs", blogs);
    res.status(200).json(blogs); 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  getBlogsByBrand,
  getBlogsByCategory,
  getblogsByTags,
  getBlogsByCountry
};
