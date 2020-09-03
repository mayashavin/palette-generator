<template>
  <div class="mt-3 mx-8 border-b pb-5">
    <div class="container flex-col sm:flex-row">
      <div class="flex flex-1 flex-col justify-center sm:mr-3">
        <h2 class="text-4xl font-semibold text-left mb-3">Generate color scheme from photos and use them in TailwindCSS</h2>
        <h3 class="text-xl text-left mb-8 text-gray-700">
          Upload your image and our tool will generate the right palettes for you to use in your project with TailwindCSS.
        </h3>
        <div class="flex items-center flex-col lg:flex-row justify-center lg:justify-start">
          <button class="rounded px-5 py-3 bg-cloudinary-500 text-white relative mb-3 w-full lg:w-auto flex justify-center">
            <span class="flex items-center">
              <svg-icon name="upload" class="w-4 h-4 fill-current mr-3"/>
              Upload image
            </span>
            <input
              type="file"
              tabindex="-1"
              accept=".jpeg,.jpg,.png,image/jpeg,image/png"
              class="opacity-0 absolute inset-0 w-full cursor-pointer"
              @change="selectFile"
              aria-label="upload image button"
            />
          </button>
          <!-- <button class="rounded px-5 py-3 border border-sea-buckthorn-700 text-sea-buckthorn-700 lg:ml-3 hover:border-2 mb-3 w-full lg:w-auto">
            From Cloudinary
          </button> -->
        </div>
      </div>
      <div v-show="loading" class="w-full sm:w-box h-box flex flex-col justify-center items-center border rounded-t-lg rounded-b-lg bg-gray-100">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 w-12 h-12"></div>
        <span class="pt-5 text-gray-500 text-sm">Generating colors...</span>
      </div>
      <div class="rounded-b-lg rounded-t-lg relative sm:w-box sm:h-box flex" v-show="!loading">
        <picture class="flex items-center">
          <source :srcset="demo.delivery_url" media="(min-width:0px)">
          <img :src="demo.delivery_url" alt="uploaded photo for color detection" class="rounded-t-lg rounded-b-lg self-align sm:w-box"/>
        </picture>
        <div class="rounded-b-lg flex h-24 absolute bottom-0 w-full">
          <div 
            v-for="(color, index) in demo.colors"
            :key="color.main.hex"          
            :class="`w-1/${demo.colors.length}`"
          >
            <div class="h-full" :class="getBorderClass(index)" :style="`background-color:${color.main.hex};`" />
            <div class="py-4 text-sm">
              <div class="font-bold pb-1">{{ color.main.name }}</div>
              <div class="text-gray-700">{{ color.main.hex}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t mt-24 py-5" v-if="!loading">
      <h2 class="text-3xl font-bold pb-5 text-center">Color palettes for TailwindCSS</h2>
      <p class="text-lg pb-5 text-gray-700 text-center italic">Customize the color theme for your TailwindCSS project <b>in 3 simple steps</b>:</p>
      <p class="text-md py-5 text-gray-800 flex justify-center">
        <svg-icon name="palette" class="w-10 md:w-5 h-5 text-sea-buckthorn-500 fill-current mr-3" arial-hidden='true'/>
        <span><b>Copy</b> code for a single palette, or hit "Copy all code" button for all the generated palettes. </span>
      </p>
      <button 
        class="rounded mx-auto px-5 py-2 mb-8 flex items-center"
        @click="copyToClipboard"
        :disabled="copied"
        :class="copyBtnClass"
      >
        <svg-icon :name="copied ? 'check-circle' : 'copy'" class="w-4 h-4 fill-current mr-3"/>
        <span>{{copied ? 'Copied to clipboard' : 'Copy all code'}}</span>
      </button>
      <div class="flex max-w-6xl mx-auto flex-col md:flex-row">
        <div
          v-for="color in demo.colors"
          :key="color.main.hex"          
          :class="`md:w-1/${demo.colors.length}`"
        >
          <tailwind-palette :color="color" class="text-sm m-1" />
          <tailwind-code :palette="color.code" :name="color.main.hex" class="text-sm m-1" />
        </div>
      </div>
      <div class="w-full flex opacity-0 absolute" id="palettes-code" style="z-index: -1;">
          <tailwind-code
            v-for="color in demo.colors"
            :key="color.main.hex"
            :palette="color.code"
            :name="color.main.hex"
            class="text-sm m-1"
          />
      </div>
      <p class="text-md pt-8 pb-5 text-gray-800 flex justify-center">
        <svg-icon name="paint-roller" class="w-10 md:w-5 h-5 text-sea-buckthorn-500 fill-current mr-3 mt-1" />
        <span class="flex items-center flex-wrap">
          <span><b>Paste </b> the copied code to</span>
          <pre class="mx-2 bg-gray-300 px-2 py-1 rounded">theme.extend.colors</pre>
          <span>field, in</span>
          <pre class="mx-2 bg-gray-300 px-2 py-1 rounded">tailwind.config.js</pre> file, as shown below: </span>
      </p>
      <div class="mx-auto flex justify-center">
        <picture>
          <source :srcset="step2.regularUrl" media="(min-width:640px)">
          <source :srcset="step2.mobUrl" media="(min-width:0px)">
          <img :src="step2.regularUrl" alt="Step 2 - Paste the copied code"/>
        </picture>
      </div>      
      <p class="text-md pb-5 text-gray-800 flex pt-8 justify-center">
        <svg-icon name="pencil-paintbrush" class="w-12 md:w-6 h-5 text-sea-buckthorn-500 fill-current mr-3 mt-1 self-start" />
        <span class="flex items-center flex-wrap">
          <span>Use it through generated <b>class selectors</b>,</span> for example 
          <pre class="mx-2 bg-gray-300 px-2 py-1 rounded">bg-cloudinary-500</pre> for setting 
          <pre class="mx-2 bg-gray-300 px-2 py-1 rounded">background-color</pre> to palette variant 
          <pre class="mx-2 bg-gray-300 px-2 py-1 rounded">500</pre> under color named 
          <pre class="mx-2 bg-gray-300 px-2 py-1 rounded">cloudinary</pre>.
        </span>
      </p>
      <div class="mx-auto flex justify-center">
        <picture>
          <source :srcset="step3.regularUrl" media="(min-width:640px)">
          <source :srcset="step3.mobUrl" media="(min-width:0px)">
          <img :src="step3.regularUrl" alt="Step 3 - Use color theme with class selectors"/>
        </picture>
      </div>  
    </div>
  </div>
</template>

<script>
import copy from '~/mixins/copyToClipboard'

export default {
  mixins: [copy],
  async asyncData({ $axios }) {
    try {
      const demo = await $axios.$post('/api/generate', {
        publicId: 'nuxt_demo/8878'
      });

      return {
        demo,
        loading: false
      }
    } catch(e) {
      console.log(e)
    }
  },
  data() {
    return {
      demo: {},
      loading: true,      
      copied: false,
      step2: {
        regularUrl: 'https://res.cloudinary.com/mayashavin/image/upload/w_600,q_auto,f_auto/v1599156041/colors_generator/paste',
        mobUrl: 'https://res.cloudinary.com/mayashavin/image/upload/w_400,q_auto,f_auto/v1599156041/colors_generator/paste'
      },
      step3: {
        regularUrl: 'https://res.cloudinary.com/mayashavin/image/upload/w_600,q_auto,f_auto/v1599158305/colors_generator/step3',
        mobUrl: 'https://res.cloudinary.com/mayashavin/image/upload/w_400,q_auto,f_auto/v1599158305/colors_generator/step3'
      }
    }
  },
  computed: {
    copyBtnClass() {
      return {
        'text-sea-buckthorn-600 border-sea-buckthorn-100 border bg-sea-buckthorn-100 cursor-default': this.copied,
        'text-white bg-sea-buckthorn-600': !this.copied 
      }
    }
  },
  methods: {
    getBorderClass(index) {
      if (index === 0) return "rounded-bl-lg"
      else if (index === this.demo.colors.length - 1) return "rounded-br-lg"
      else return ""
    },
    async selectFile(e) {
      const file = e.target.files[0];

      if (file) {
        this.loading = true
        const readData = (f) => new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(file);
        })

        const data = await readData(file)
        const resource = await this.$axios.$post('/api/generate', {
          file: data
        })

        console.log(resource)
        this.demo = resource
        this.loading = false
      }
    },
    copyToClipboard() {
      const nodes = document.getElementById('palettes-code')
      
      this.copy(nodes)

      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 5000)
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS */
.container {
@apply flex-1 flex justify-between text-center mx-auto;
}

.loader {
  animation: spin 2s linear infinite;
  border-top-color: #3444CC;  
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
