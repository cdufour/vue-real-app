import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import BaseIcon from '@/components/BaseIcon.vue';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'nprogress/nprogress.css'
import Vuelidate from 'vuelidate'
import DateFilter from '@/filters/date'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.filter('date', DateFilter)

//Vue.component('BaseIcon', BaseIcon)

const requireComponent = require.context(
  './components',
  false, // do not include subfolders
  /Base[A-Z]\w+\.(vue|js)$/
)

//console.log(requireComponent.keys())
// => ["./BaseButton.vue", "./BaseIcon.vue", "./BaseInput.vue"]

requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename)

  // conservation du nom par remplacement
  // "./BaseButton.vue" => BaseButton
  const componentName = upperFirst(
    camelCase(
      filename.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  

  // enregistrement du composant global
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )

})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
