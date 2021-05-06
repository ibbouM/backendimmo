const cloudinary = require("../utils/cloudinary");


const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      console.log(res.secure_url);
      resolve({
        image: res.secure_url,
        id: res.public_id ,
      });
    });
  });
};

module.exports = cloudinaryImageUploadMethod;
