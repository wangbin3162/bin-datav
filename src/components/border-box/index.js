import BorderBox from './main'

BorderBox.install = app => {
  app.component(BorderBox.name, BorderBox)
}

export default BorderBox
