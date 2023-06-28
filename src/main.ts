import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './router'
import * as vueSharedConsts from '@static/consts/consts'

import '@scss/_index.scss'

const pinia = createPinia()

const app = createApp( App )
app.mixin( {
  data() {
    return {
      ...vueSharedConsts,
    }
  },
} )

app.use( router )
app.use( pinia )

app.mount( '#app' )
