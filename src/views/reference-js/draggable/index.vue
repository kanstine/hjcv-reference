
<template>
  <div>
    <!-- 拖拽 -->
    <Draggable>
      <div
        class="block-1"
        @mousedown="handleMοusedοwnTest"
        @mouseup="handleTemplateMouseup"
      >1</div>
      <div class="block-2">2</div>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
  name: '',
  components: {
    Draggable
  },
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

</style>
