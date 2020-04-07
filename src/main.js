import Vue from 'vue'
import App from './App.vue'

import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import UserComponent from './components/UserComponent.vue'
import TeamComponent from './components/TeamComponent.vue'
import MeetingComponent from './components/MeetingComponent.vue'

import TeamPageComponent from './components/TeamPageComponent.vue'


const NotFound = { template: '<h2>Page Not Found</h2>' }
const routes = [
  { path: '/', component: UserComponent },
  { path: '/teams', component: TeamComponent },
  { path: '/meetings', component: MeetingComponent },
  { path: '*', component: NotFound },
  { path: '/teams/:id', name: 'teampage', component: TeamPageComponent }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});



new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store

})
