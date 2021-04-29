<template>
  <div class="reference-page">
    <!-- grid 布局 -->
    <div class="title">Grid 布局</div>
    <div class="grid-box">
      <div class="grid-block re-block block-1">
        1
      </div>
      <div class="grid-block re-block block-2">
        2
      </div>
      <div class="grid-block re-block block-3">
        3
      </div>
      <div class="grid-block re-block block-4">
        4
      </div>
      <div class="grid-block re-block block-5">
        5
      </div>
      <div class="grid-block re-block block-6">
        6
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .grid-box {
    display: grid;
    .grid-block {
      display: inline-grid;
    }
  }
</style>
