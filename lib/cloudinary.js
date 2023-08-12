import cloudinary from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


module.exports = async (file)=>{
    try {
        const res =await cloudinary.uploader.upload(file)
        return res.secure_url
    } catch (error) {
        return error
    }
}