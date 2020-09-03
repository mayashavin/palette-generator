const tints = {
  50: 0.95,
  100: 0.9,
  200: 0.75,
  300: 0.6,
  400: 0.3
}

const shades = {
  600: 0.9,
  700: 0.6,
  800: 0.45,
  900: 0.3
}

const HEX_TO_RGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const getIntValue = (str) => parseInt(str, 16)

const getRoundTintValue = (num, intensity) => Math.round(num + (255 - num) * intensity)

const getRoundValue = (num, intensity) => Math.round(num * intensity)

const getHexPart = color => `0${color.toString(16)}`.slice(-2)

const hexToRgb = hex => {
  const rgbs = HEX_TO_RGB.exec(`${hex.startsWith('#') ? '': '#'}${hex}`)

  return rgbs ? {
    r: getIntValue(rgbs[1]),
    g: getIntValue(rgbs[2]),
    b: getIntValue(rgbs[3]),
  } : null
}

const rgbToHex = ({ r, g, b }) => `#${getHexPart(r)}${getHexPart(g)}${getHexPart(b)}`

const tint = (hex, intensity) => {
  const rgbColor = hexToRgb(hex),
        r = getRoundTintValue(rgbColor.r, intensity),
        g = getRoundTintValue(rgbColor.g, intensity),
        b = getRoundTintValue(rgbColor.b, intensity);
  
  return rgbToHex({ r, g, b })
}

const shade = (hex, intensity) => {
  const rgbColor = hexToRgb(hex),
        r = getRoundValue(rgbColor.r, intensity),
        g = getRoundValue(rgbColor.g, intensity),
        b = getRoundValue(rgbColor.b, intensity);
  
  return rgbToHex({ r, g, b })
}

const getTextColor = hex => {
  const rgbColor = hexToRgb(hex);

  if (rgbColor) {
    const { r, g, b } = rgbColor
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 120 ? "#FFFFFF" : "#333333";
  }

  return "#FFFFFF"
}

const generatePalettes = color => {
  const colors = [];

  for (const key in tints) {
    const tinted = tints[key];
    const tintedColor = tint(color.hex, tinted);
    
    colors.push({
      name: `${color.name}-${key}`,
      label: key,
      bg: tintedColor,
      text: getTextColor(tintedColor),
      hex: tintedColor,
    })
  }

  colors.push({
    name: color.name,
    label: '500',
    bg: `${color.hex.startsWith('#') ? '': '#'}${color.hex}`,
    text: getTextColor(color.hex),
    hex: `${color.hex.startsWith('#') ? '': '#'}${color.hex}`,
  })

  for (const key in shades) {
    const shaded = shades[key];
    const shadedColor = shade(color.hex, shaded);
    
    colors.push({
      name: `${color.name}-${key}`,
      label: key,
      bg: shadedColor,
      hex: shadedColor,
      text: getTextColor(shadedColor)
    })
  }

  return colors;
}

const getCodes = (color, palette) => {
  let code = `'${color.name.replace(' ', '-').toLowerCase()}': {\n`;

  for (let i = 0; i < palette.length; i++) {
    const colorP = palette[i];

    code += `\t${colorP.label}: '${colorP.hex.toUpperCase()}',\n`
  }

  code += `},`

  return code;
}

module.exports = generatePalettes

module.exports.generatePalettes = generatePalettes

module.exports.getTextColor = getTextColor

module.exports.getCodes = getCodes