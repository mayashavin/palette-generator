/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        cloudinary: {
          50: '#F4F3F9',
          100: '#E9E8F3',
          200: '#C8C4E0',
          300: '#A7A1CE',
          400: '#655BA9',
          500: '#231484',
          600: '#201277',
          700: '#150C4F',
          800: '#10093B',
          900: '#0B0628',
        },
        'sea-buckthorn': {
          50: '#FEFAF4',
          100: '#FEF6E9',
          200: '#FCE8C8',
          300: '#FBDBA7',
          400: '#F7BF66',
          500: '#F4A424',
          600: '#DC9420',
          700: '#926216',
          800: '#6E4A10',
          900: '#49310B',
        },
      },
      width: {
        box: '500px'
      },
      height: {
        box: '500px'
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
