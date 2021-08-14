import Icon from './components/icon'
import CountTo from './components/count-to'
import config from '../package.json'
import log from './utils/log'

const version = config.version // version_ to fix tsc issue

const components = [
  Icon,
  CountTo,
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
  Icon,
  CountTo,
}

export default {
  version,
  install,
}
