require("dotenv").config()

const upload = async (req, res) => {
  // const uploader = cloudinary.v2.uploader;

  // const resource = await uploader.upload(req.body.file, {
  //   public_id: 'temp',
  //   folder: process.env.FOLDER,
  //   colors: true
  // }, () => {})

  return res.json({
    colors: []
  })
}

module.exports = upload