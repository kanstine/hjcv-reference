/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const cssRouter = {
  path: '/cssReference',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Css',
  meta: {
    title: 'Css',
    icon: 'chart'
  },
  children: [
    {
      path: 'cssHome',
      component: () => import('@/views/reference-css'),
      name: 'cssHome',
      meta: { title: 'Css 参考', noCache: true }
    },
    {
      path: 'grid',
      component: () => import('@/views/reference-css/Grid.vue'),
      name: 'grid',
      meta: { title: 'Grid 布局', noCache: true }
    }
  ]
}

export default cssRouter
