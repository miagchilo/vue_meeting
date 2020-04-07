<template>
  <div id="app">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Пользователи</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/teams" class="nav-link">Команды</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/meetings" class="nav-link">Встречи</router-link>
      </li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import DataService from './dataService';
import store from './store';

window.addEventListener('storage', function (event) {
  switch (event.key) {
    case 'users': {
      DataService.getData( store, true, 'users' );
      break;
    }
    case 'teams': {
      DataService.getData( store, true, 'teams' );
      break;
    }
    case 'meetings': {
      DataService.getData( store, true, 'meetings' );
      break;
    }
    default: {
      console.log(event.key, event.newValue);
      break;
    }
  }
});
export default {
  name: "app",
};

</script>
<style lang="scss" src="./assets/style.scss">
</style>
