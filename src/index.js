import Icon from './components/icon'
import CountTo from './components/count-to'
import Loading from './components/loading'
import BorderBox from './components/border-box'

import config from '../package.json'
import log from './utils/log'

const version = config.version // version_ to fix tsc issue

const components = [
  Icon,
  CountTo,
  Loading,
  BorderBox,
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
  Loading,
  BorderBox
}

export default {
  version,
  install,
}
