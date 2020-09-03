const colorNamer = require('color-namer')

const normalizeResource = (resource) => {
  const predominant = resource.colors.filter(color => color[0] !== '#FFFFFF' && color[0] !== '#000000');

  const colors = predominant.length > 4 ? predominant.slice(0, 4) : predominant;

  if (colors) {
    return {
      colors: colors.map(color => ({
        name: colorNamer(color[0]).ntc[0].name,
        hex: color[0]
      })),
      secure_url: resource.secure_url,
      public_id: resource.public_id,
      asset_id: resource.asset_id,
      delivery_url: `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/w_500,q_auto,f_auto/v${resource.version}/${resource.public_id}`
    }
  }
}

module.exports = normalizeResource