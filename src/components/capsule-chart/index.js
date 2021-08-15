import CapsuleChart from './main.vue'

CapsuleChart.install = app => {
  app.component(CapsuleChart.name, CapsuleChart)
}

export default CapsuleChart
