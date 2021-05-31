<template>
  <div class="reference-page">
    <!-- 图片自适应展示 -->
    图片自适应展示
    <el-button @click="handleImage(0)">普通</el-button>
    <el-button @click="handleImage(1)">长图</el-button>
    <el-button @click="handleImage(2)">宽图</el-button>
    <el-button @click="handleImage(3)">小图</el-button>
    <!-- 等比缩放图片，确保图片容器区域被填满，超出部分隐藏，移动图片确保容器中心对应图片中心 -->
    <div>16 : 9 (320 : 180)</div>
    <div id="image-show" class="show-box" />
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      urlList: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2196581227,54033567&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2174384932,1613588892&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2847425452,2828367808&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1495761429,1840845830&fm=26&gp=0.jpg'
      ],
      attribute: {
        width: 320, // 期望宽高
        height: 180
      }
      /* url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3206689113,2237998950&fm=26&gp=0.jpg',
      urlLong: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2174384932,1613588892&fm=26&gp=0.jpg',
      urlWide: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2847425452,2828367808&fm=26&gp=0.jpg' */
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取图片宽高
    handleImage(type) {
      const url = this.urlList[type]
      const img = new Image()
      img.src = url
      // 判断是否有缓存
      if (img.complete) {
        // 打印
        console.log('原图宽: ' + img.width + ',高:' + img.height)
        this.setImage(img, this.attribute, 'image-show')
      } else {
        // 加载完成执行
        const _this = this
        img.onload = function() {
          // 打印
          console.log('原图宽: ' + img.width + ',高:' + img.height)
          _this.setImage(img, _this.attribute, 'image-show')
        }
      }
    },

    //
    setImage(img, attribute, domId) {
      if (img && img.width && img.height) {
        // 判断宽高
        // 比例相同
        if (attribute.width / attribute.height === img.width / img.height) {
          // 等比缩放
          img.width = attribute.width
          img.height = attribute.height
        } else if (attribute.width / attribute.height > img.width / img.height) {
          // 相对标准 高占优势，等比缩放后调整Y轴定位
          const ratio = attribute.width / img.width
          img.width = attribute.width
          img.height = img.height * ratio
          // 计算位移
          const moveY = (img.height - attribute.height) / 2
          // img.style = `top: -${moveY};`
          img.setAttribute('style', `position: absolute; top: -${moveY}px;`)
        } else if (attribute.width / attribute.height < img.width / img.height) {
          // 相对标准 宽占优势，等比缩放后调整X轴定位
          const ratio = attribute.height / img.height
          img.width = img.width * ratio
          img.height = attribute.height
          // 计算位移
          const moveX = (img.width - attribute.width) / 2
          img.setAttribute('style', `position: absolute; left: -${moveX}px;`)
        }

        console.log('处理后图片', img)

        const ele = document.getElementById(domId)
        // 删除原有元素
        ele.innerHTML = ''
        // 添加元素
        ele.appendChild(img)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .show-box {
    position: relative;
    width: 320px;
    height: 180px;
    margin: 20px;
    border: 1px solid #ddd;
    overflow: hidden;
  }
</style>
