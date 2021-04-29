<template>
  <div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleClickMenuItem(1)">菜单1</v-contextmenu-item>
      <v-contextmenu-item @click="handleClickMenuItem(2)">菜单2</v-contextmenu-item>
      <v-contextmenu-item @click="handleClickMenuItem(3)">菜单3</v-contextmenu-item>
    </v-contextmenu>
    <v-contextmenu ref="contextmenuOther">
      <v-contextmenu-item>菜单a</v-contextmenu-item>
      <v-contextmenu-item>菜单b</v-contextmenu-item>
      <v-contextmenu-item>菜单c</v-contextmenu-item>
    </v-contextmenu>
    <div v-contextmenu:contextmenu class="show-context-menu">右键点击此区域</div>
    <div v-contextmenu:contextmenuOther class="show-context-menu">右键点击此区域</div>
  </div>
</template>
<script>
export default {
  name: 'ContextMenuDemo',
  data() {
    return {
    // 菜单数据
      contextMenuData: {}
    }
  },
  methods: {
    //
    handleClickMenuItem(item) {
      console.log('菜单点击' + item)
    }
  }
}
</script>

<style scoped>
  .show-context-menu {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    margin: 10px;
  }
</style>
