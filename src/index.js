import BIcon from './components/icon'

import config from '../package.json'
import log from './utils/log'

const version = config.version // version_ to fix tsc issue

const components = [
  BIcon,
]
const install = function (app, options = {}) {
  components.forEach(component => {
    app.use(component)
  })

  if (!options.disabledDoc) {
    log.pretty(`[${config.name}] ${config.version}`, config.homepage)
  }
  return app
}

export {
  BIcon,
}

export default {
  version,
  install,
}
