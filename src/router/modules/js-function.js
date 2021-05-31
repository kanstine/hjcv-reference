/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const jsRouter = {
  path: '/jsReference',
  component: Layout,
  redirect: 'noRedirect',
  name: 'js',
  meta: {
    title: 'JS',
    icon: 'chart'
  },
  children: [
    {
      path: 'jsHome',
      component: () => import('@/views/reference-js'),
      name: 'jsHome',
      meta: { title: 'js 参考', noCache: true }
    },
    {
      path: 'jsPlumb',
      component: () => import('@/views/reference-js/jsPlumb'),
      name: 'jsPlumb',
      meta: { title: '连线', noCache: true }
    },
    {
      path: 'contextMenu',
      component: () => import('@/views/reference-js/context-menu'),
      name: 'contextMenu',
      meta: { title: '右键菜单', noCache: true }
    },
    {
      path: 'imageSelfAdaption',
      component: () => import('@/views/reference-js/image/ImageSelfAdaption.vue'),
      name: 'imageSelfAdaption',
      meta: { title: '图片展示', noCache: true }
    }
  ]
}

export default jsRouter
