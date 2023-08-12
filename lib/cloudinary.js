import cloudinary from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dix4e1hy2', 
  api_key: '421766391767134', 
  api_secret: 'YpaKtY91hF7sG2qzBGYxktSUo0s' 
});


module.exports = async (file)=>{
    try {
        const res =await cloudinary.uploader.upload(file)
        return res.secure_url
    } catch (error) {
        return error
    }
}