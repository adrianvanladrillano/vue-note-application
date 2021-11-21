<template>
  <div>
    <v-slider
      type="number"
      @input="testfunc()"
      v-model="slider"
      max="255"
    ></v-slider>
    <v-card
      width="255"
      height="255"
      :style="`background: rgba(${red}, ${green}, 0, 1)`"
    ></v-card>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea obcaecati
    quibusdam aspernatur repellat qui? Vitae mollitia eius at eaque itaque ipsa
    molestias animi non. Minus temporibus unde hic consequuntur laboriosam.
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: 1,
    red: 255,
    green: 0,
    tab: null,
    test: [1, 2, 3, 4, 5, 6, 7]
  }),
  mounted() {
    const vm = this
    import('@ckeditor/ckeditor5-build-classic').then(editor => {
      vm.editor = editor.default
    })
  },
  methods: {
    testfunc() {
      this.red--
      this.green++
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 800px;
    max-height: 400px;
    overflow-y: auto;
  }
}
