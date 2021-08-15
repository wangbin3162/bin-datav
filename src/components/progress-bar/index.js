import ProgressBar from './main.vue'

ProgressBar.install = (app) => {
  app.component(ProgressBar.name, ProgressBar)
}

export default ProgressBar
