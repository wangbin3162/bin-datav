import Icon from './components/icon'
import CountTo from './components/count-to'
import Loading from './components/loading'
import BorderBox from './components/border-box'
import Decorator from './components/decorator'

import config from '../package.json'
import * as Util from './utils/util'
import log from './utils/log'

const version = config.version // version_ to fix tsc issue

const components = [
  Icon,
  CountTo,
  Loading,
  BorderBox,
  Decorator,
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
  Util,
  Icon,
  CountTo,
  Loading,
  BorderBox,
  Decorator,
}

export default {
  version,
  install,
}
