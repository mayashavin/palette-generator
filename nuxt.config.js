import pkg from './package'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Palette Generator from images to use in TailwindCSS ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content:
          'https://res.cloudinary.com/mayashavin/image/upload/q_auto,f_auto/v1599115565/colors_generator/logo_transparent_background'
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
        hid: 'twitter:card'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Palette Generator from images'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: pkg.description
      },
      // Facebook OpenGraph
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Palette Generator from images'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Palette Generator from images'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: pkg.description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://res.cloudinary.com/mayashavin/image/upload/q_auto,f_auto/v1599115565/colors_generator/logo_transparent_background'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'https://res.cloudinary.com/mayashavin/image/upload/v1599163766/colors_generator/palette_generator.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  axios: {
    baseURL: process.env.baseURL,
  },
}
