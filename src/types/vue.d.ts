import * as vueSharedGlobals from '@static/consts/consts'

declare module 'vue' {
  interface ComponentCustomProperties {
    OPERATION_STATUS: typeof vueSharedGlobals['OPERATION_STATUS'];
    SUPPORTED_LOCALES: typeof vueSharedGlobals['SUPPORTED_LOCALES'];
  }
}

export {}
