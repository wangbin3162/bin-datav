import Decorator from './main'

Decorator.install = app => {
  app.component(Decorator.name, Decorator)
}

export default Decorator
