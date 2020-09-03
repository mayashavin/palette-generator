<template>
  <div class="relative text-gray-700 p-3 rounded-t-lg rounded-b-lg border">
    <ul :id="`code-${name}`" ref="codeNode">
      <li v-for="(row,index) in code"
        :key="index"
        class="py-1"
        :class="getClass(index)"
      >
        {{row}}
      </li>      
    </ul>
    <button class="absolute top-0 right-0 m-3 pointer hover:text-sea-buckthorn-600" @click="copyToClipboard" aria-label="Copy to clipboard">
      <svg-icon name="copy" class="w-4 h-4 fill-current"/>
    </button>
  </div>
</template>
<script>
import copy from '~/mixins/copyToClipboard'

export default {
  mixins: [copy],
  props: {
    palette: {
      type: String,
      required: true
    },
    name : {
      type: String,
      required: true,
    }
  },
  computed: {
    code() {
      return this.palette.split('\n')
    }
  },
  methods: {
    getClass(index) {
      return index === 0 || index === this.code.length - 1 ? '' : 'pl-5'
    },
    copyToClipboard() {
      this.copy(this.$refs.codeNode)
    }
  }  
}
</script>