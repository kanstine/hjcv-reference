<template>
  <div class="reference-page">
    <!-- 连线、拖拽组件 -->
    <!-- https://wdd.js.org/jsplumb-chinese-tutorial/#/ -->
    <div>
      JSPlumb 连线、拖拽组件
      <el-button @click="addBlock">添加</el-button>
      <el-button @click="connectBlock">连接</el-button>
      <el-button @click="beforeDrop">开启校验</el-button>
    </div>
    <div class="plumb-box pall10">
      <div id="item_left" class="block-1">1</div>
      <div id="item_right" class="block-2">2-1</div>
      <div id="item_right2" class="block-3">2-2</div>
      <div v-for="item in itemList" :id="`item_other_${item.value}`" :key="item.value" class="block-5 block-other">
        <div>add-{{ item.value }}</div>
        <el-button style="height: 40px" @click="deleteBlock(item)">删除</el-button>
      </div>
    </div>
    <div id="item_other" class="block-4">3</div>
  </div>
</template>

<script>
import jsPlumb from 'jsplumb'
export default {
  name: 'PlumbReference',
  props: {},
  data() {
    return {
      jsplumb: '',
      itemList: []
    }
  },
  created() {
    this.jsplumb = jsPlumb.jsPlumb
    this.$nextTick(() => {
      this.createPlumb()
      this.createEndpoint()
      this.addEventConnector()
    })
  },
  mounted() {},
  methods: {
    // jsplumb 事件
    // connection 连接建立时触发
    // connectionDetached 连接断开时触发
    // connectionMoved 连接移动事件
    // connectionAborted 连接取消事件
    // click 连接点击事件
    // dblclick 连接双击事件
    // connectionDrag 连接拖动事件
    // connectionDragStop 连接停止拖动事件
    // endpointClick 端点单击事件
    // endpointDblClick 端点双击事件
    // contextmenu 鼠标右键事件
    // beforeDrop 连接建立前事件
    // beforeDetach 连接断开前事件
    // zoom 缩放事件
    // 其他事件
    // Connection Events 在获得一个连接后，可以单独给某个连接绑定事件
    // Endpoint Events 在获得一个端点后，可以单独给某个端点绑定事件
    // Overlay Events
    // ==========================================================
    // jsplumb 工具函数
    // 重绘某个元素 jsPlumb.revalidate(el)
    /*  el 可以是
        一个字符串，表示某个元素的id
        一个字符串列表，表示某些元素的id
        一个DOM元素
        DOM元素的列表
        来自基础库的选择器 */
    // 重绘所有元素 jsPlumb.repaintEverything()
    // 重设节点ID jsPlumb.setId
    // 删除节点 jsPlumb.remove
    // 清空所有节点连接和端点 jsPlumb.empty
    // 移除连线 jsPlumb.detach
    // 移除某个节点上的所有连线 jsPlumb.deleteConnectionsForElement
    // 移除所有节点上的连线 jsPlumb.deleteEveryConnection()
    // 移除某个节点上的端点
    // 移除所有节点上的端点
    // 元素的显示与隐藏
    // ==========================================================

    createPlumb() {
      console.log('jsplumb', this.jsplumb)
      const _this = this
      this.jsplumb.ready(function() {
        // 设置默认配置
        const common = {
          isSource: true, // 作为源节点
          isTarget: true, // 作为目标节点
          endpoint: 'Dot', // 端点 Dot 圆 / Rectangle 方块 / Blank 空白 / Image 图像
          connector: 'Flowchart', // 连接，连接线 Bezier 贝塞尔曲线 / Straight 直线 / Flowchart 90度转角线 / State Machine 状态机
          // overlays: 'PlainArrow', // Overlays 可以理解为在连接线上的文字或者箭头之类的东东
          anchor: ['Left', 'Right'], // 设置连接点位置
          paintStyle: { stroke: 'lightgray', strokeWidth: 3 }, // 设置连线样式
          endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 } // 设置端点样式
        }
        // 创建连接点
        _this.jsplumb.connect({
          source: 'item_left', // 源节点
          target: 'item_right', // 目标节点
          overlays: [['Arrow', { width: 12, length: 12, location: 0.5 }]] // 可设置多个
        }, common)
        _this.jsplumb.connect({
          source: 'item_left', // 源节点
          target: 'item_right2', // 目标节点
          overlays: [['Arrow', { width: 12, length: 12, location: 0.9 }]] // location 0.5表示箭头位于中间，location 1表示箭头设置在连线末端。
        }, common)

        // 设置连接点可拖动
        _this.jsplumb.draggable('item_left')
        _this.jsplumb.draggable('item_right')
      })
    },

    // 创建可连接端点
    createEndpoint() {
      const _this = this
      this.jsplumb.ready(function() {
        const common = {
          isSource: true,
          isTarget: true,
          connector: ['Straight']
        }
        // 创建端点
        _this.jsplumb.addEndpoint('item_left', {
          anchors: ['Bottom'],
          uuid: 'item_left_b'
        }, common)
        _this.jsplumb.addEndpoint('item_other', {
          anchors: ['Left'],
          uuid: 'item_other_l'
        }, common)
      })
      // 两点连接后，禁止修改连接
      /* _this.jsplumb.importDefaults({
        ConnectionsDetachable: false
      }) */
      //
      this.jsplumb.bind('connection', function(info, originalEvent) {
        // .. update your model in here, maybe.
        console.log('连接被建立', info, originalEvent)
      })
    },

    // 连接前校验
    beforeDrop() {
      //
      console.log('模拟校验(开启后不可拖动连接)')
      this.jsplumb.bind('beforeDrop', function(info) {
        var a = 10
        var b = 2
        if (a < b) {
          console.log('连接会自动建立')
          return true // 连接会自动建立
        } else {
          console.log('连接取消')
          return false // 连接不会建立，注意，必须是false
        }
      })
    },

    // 添加一个块，并连接
    addBlock() {
      const data = {
        label: '',
        value: this.itemList.length ? this.itemList.length + 1 : 1
      }
      this.itemList.push(data)
      const _this = this
      this.$nextTick(() => {
        // 渲染完毕后连接块
        this.jsplumb.ready(function() {
          // 创建连接点
          _this.jsplumb.connect({
            source: 'item_left', // 源节点
            target: `item_other_${data.value}`, // 目标节点
            endpoint: 'Rectangle',
            connector: 'Flowchart',
            anchor: ['Left', 'Right'] // 设置连接点位置
          })
        })
      })
    },

    // 给连接设置事件
    addEventConnector() {
      const _this = this
      this.jsplumb.bind('click', function(conn, originalEvent) {
        console.log('删除连线', conn, originalEvent)
        console.log('删除连线', _this.jsplumb)
        _this.jsplumb.deleteConnection(conn)
      })
    },

    // 删除节点
    deleteBlock(item) {
      this.jsplumb.remove(`item_other_${item.value}`)
    },

    // 连接节点
    connectBlock() {
      this.jsplumb.connect({ uuids: ['item_left_b', 'item_other_l'] })
    }
  }
}
</script>

<style lang="scss" scoped>
  .plumb-box {
    display: flex;
  }
  .block-1 {
    position: absolute;
    // margin-right: 100px;
  }
  .block-2 {
    position: absolute;
    left: 400px;
  }
  .block-3 {
    position: absolute;
    left: 200px;
    top: 200px;
  }
  .block-4 {
    position: absolute;
    left: 200px;
    top: 400px;
  }
  .block-5 {
    position: relative;
    left: 200px;
    top: 600px;
  }
  .block-other {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
