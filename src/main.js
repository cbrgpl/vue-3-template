import { createApp } from 'vue'

import '@/scss/_predefined.scss'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp( App )

app.use( store ).use( router )


app.mount( '#app' )
