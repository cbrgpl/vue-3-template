import { createRouter, createWebHistory } from 'vue-router'

// import * as guards from './guards'
// import * as utils from './utils'

const router = createRouter( {
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    {
      path: '/',
      name: 'Root',
      children: [
        {
          path: '',
          name: 'Main',
          component: () => import( '@/views/TheMainPage.vue' ),
        },
        {
          path: ':anySymbolSequence+',
          name: 'NotFound',
          component: () => import( '@/views/TheNotFound.vue' ),
        },
      ],
    },

  ],
} )

export {
  router,
}
