<template>
  <div>
    <div
      class="p-3 rounded-t relative"
      :style="{
        backgroundColor: `${main.hex.startsWith('#') ? '': '#'}${main.hex}`,
        color: main.text
      }"
      v-if="main.name"
    >
      <span class="block font-bold pb-2">{{ main.name }}</span>
      <span>
        {{ `${main.hex.startsWith('#') ? '': '#'}${main.hex}` }}
      </span>
      <button class="absolute top-0 right-0 m-3 pointer" @click="copyToClipboard" aria-label="Copy to clipboard">
        <svg-icon name="copy" class="w-4 h-4 fill-current"/>
      </button>
    </div>
    <ul>
      <li 
        v-for="(color, index) in colors"
        :key="index"
        :style="{
          backgroundColor: color.bg,
          color: color.text
        }"
        :class="index === colors.length - 1 ? 'rounded-b' : ''"
        class="py-3 px-4 flex justify-between"
      >
        <span>{{ color.label || ''}}</span>
        <span>{{ color.bg.toUpperCase() }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import copy from '~/mixins/copyToClipboard'

export default {
  name: 'palette',
  props: {
    color: {
      type: Object,
      required: true
    },
  },
  computed: {
    colors() {
      return this.color.palettes
    },
    main() {
      return this.color.main
    }
  },
  methods: {
    copyToClipboard() {
      const node = document.getElementById(`code-${this.main.hex}`)
      this.copy(node)
    }
  }
}
</script>