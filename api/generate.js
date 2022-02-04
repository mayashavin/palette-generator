require("dotenv").config()
const cloudinary = require('cloudinary')
const colorNamer = require('color-namer')
const getColors = require('get-image-colors')
const { generatePalettes, getCodes, getTextColor } = require('./colors')

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const generate = async (req, res) => {  
  const adminAPI = cloudinary.v2.api;
  const file = {
    link: req.body.file
  }

  if (req.body.publicId) {
    const resource = await adminAPI.resource(req.body.publicId, { colors: true }, () => {})
    
    if (resource) {
      file.link = resource.secure_url;
      file.version = resource.version;
    }
  }

  const colors = await getColors(file.link);

  const predominant = colors.map(color => color.hex()).filter(color => color !== '#FFFFFF' && color !== '#000000');

  const mainColors = predominant.length > 4 ? predominant.slice(0, 4) : predominant;

  if (colors) {
    const names = {}
    return res.json({
      colors: mainColors.filter(color => {
        const name = colorNamer(color).ntc[0].name
        if(!names[name]) {
          names[name] = true
          return true
        }
      }).map(color => {
        const main = {
          name: colorNamer(color).ntc[0].name,
          hex: color,
          text: getTextColor(color)
        };

        const palettes = generatePalettes(main);
        
        return {
          main,
          palettes,
          code: getCodes(main, palettes)
        }
      }),
      delivery_url: req.body.publicId ? `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/w_500,q_auto,f_auto/v${file.version}/${req.body.publicId}` : req.body.file
    })
  }

  return res.json({
    colors: [],
    delivery_url: req.body.publicId || req.body.file
  })

}

module.exports = generate