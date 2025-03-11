const db = require('../models/index.js');
const { uploadOnCloudinary, deleteOnCloudinary } = require('../utils/cloudinary.js');
const fs = require('fs');

const adsModel = db.adsModel;

// Create a new ad
const createAd = async (req, res) => {
  try {
    const { title, description, start_date, end_date, status } = req.body;
    if (!title || !start_date || !end_date) {
      return res.status(400).json({ error: 'Title, start date, and end date are required' });
    }
    const existingTitle = await adsModel.findOne({
      where: { title: title }
    });
    
if(existingTitle){
  return res.status(400).json({ error: ' this is already exist' });
}
    let image = null;
    let image_pid;

  
    if (req.file) {
      // Upload the image to Cloudinary
      const cloudinary_res = await uploadOnCloudinary(req.file.path);
      image = cloudinary_res.url;
      image_pid = cloudinary_res.public_id;

      // Delete the local file after uploading to Cloudinary
      if (req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error deleting file from local system:', err);
          } else {
            console.log('File deleted from local system');
          }
        });
      }
    }

    
    const ad = await adsModel.create({ title, description, start_date, end_date, status, image, image_pid });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllAds = async (req, res) => {
  try {
    const ads = await adsModel.findAll();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get an ad by ID
const getAdById = async (req, res) => {
  try {
    const ad = await adsModel.findByPk(req.query.id);
    if (ad) {
      res.status(200).json(ad);
    } else {
      res.status(404).json({ error: 'Ad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an ad
const updateAd = async (req, res) => {
  try {
    const { title, description, start_date, end_date, status } = req.body;
    let image = null;
    let image_pid = null;

    // Find the existing ad
    const ad = await adsModel.findByPk(req.query.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    // Check if an image file is present in the request
    if (req.file) {
      // Upload the new image to Cloudinary
      const cloudinary_res = await uploadOnCloudinary(req.file.path);
      image = cloudinary_res.url;
      image_pid = cloudinary_res.public_id;

      // Optionally delete the old image from Cloudinary
      if (ad.image_pid) {
        await deleteOnCloudinary(ad.image_pid);
      }

      // Delete the local file after uploading to Cloudinary
      if (req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error deleting file from local system:', err);
          } else {
            console.log('File deleted from local system');
          }
        });
      }
    } else {
      // Use the existing image if no new image is provided
      image = ad.image;
      image_pid = ad.image_pid;
    }

    // Update the ad fields
    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.start_date = start_date || ad.start_date;
    ad.end_date = end_date || ad.end_date;
    ad.status = status || ad.status;
    ad.image = image;
    ad.image_pid = image_pid;

    // Save the updated ad
    await ad.save();
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an ad
const deleteAd = async (req, res) => {
  try {
    const ad = await adsModel.findByPk(req.query.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    // Delete the image from Cloudinary
    if (ad.image_pid) {
      await deleteOnCloudinary(ad.image_pid);
    }

    // Delete the ad
    await adsModel.destroy({ where: { id: req.query.id } });
    res.status(204).json({ message: 'Ad has been deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search ads by title
const searchAdsByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }

    const ads = await adsModel.findAll({
      where: {
        title: {
          [db.Sequelize.Op.like]: `%${title}%`
        }
      }
    });
    if (ads.length > 0) {
      res.status(200).json(ads);
    } else {
      res.status(404).json({ message: 'No ads found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
  searchAdsByTitle,
};
