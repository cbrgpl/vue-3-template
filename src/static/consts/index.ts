import * as consts from './consts'

const globals = {
  ...consts,
}
export type IGlobals = typeof globals

const registrateGlobals = () => {
  let global: keyof typeof globals
  for ( global in globals ) {
    const value = globals[ global ]

    if ( !( window as any )[ global ] ) {
      ( window as any )[ global ] = value
    } else {
      throw new Error( `window.${ global } уже существует` )
    }
  }
}

registrateGlobals()
