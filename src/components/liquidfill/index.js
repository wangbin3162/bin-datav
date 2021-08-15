import LiquidFill from './main'

LiquidFill.install = app => {
  app.component(LiquidFill.name, LiquidFill)
}

export default LiquidFill
